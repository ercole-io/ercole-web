local node_runtime(version) = {
  arch: 'amd64',
  containers: [
    {
      image: 'node:' + version,
    },
  ],
};

local task_test(version) = {
  name: 'test - node ' + version,
  runtime: node_runtime(version),
  environment: {},
  steps: [
    { type: 'clone' },
    { type: 'restore_cache', keys: ['cache-node' + version + '-sum-{{ md5sum "package.json" }}', 'cache-node' + version + '-date-'], dest_dir: './node_modules' },
    { type: 'run', command: 'npm install' },
    { type: 'run', command: 'npm run test:unit' },
    { type: 'save_cache', key: 'cache-node' + version + '-sum-{{ md5sum "package.json" }}', contents: [{ source_dir: './node_modules' }] },
    { type: 'save_cache', key: 'cache-node' + version + '-date-{{ year }}-{{ month }}-{{ day }}', contents: [{ source_dir: './node_modules' }] },
  ],
};

local task_build(version) = {
  name: 'build - node ' + version,
  runtime: node_runtime(version),
  environment: {},
  steps: [
    { type: 'clone' },
    { type: 'restore_cache', keys: ['cache-node' + version + '-sum-{{ md5sum "package.json" }}', 'cache-node' + version + '-date-'], dest_dir: './node_modules' },
    { type: 'run', command: 'npm install' },
    { type: 'run', command: 'npm run build' },
    { type: 'save_cache', key: 'cache-node' + version + '-sum-{{ md5sum "package.json" }}', contents: [{ source_dir: './node_modules' }] },
    { type: 'save_cache', key: 'cache-node' + version + '-date-{{ year }}-{{ month }}-{{ day }}', contents: [{ source_dir: './node_modules' }] },
    { type: 'save_to_workspace', contents: [{ source_dir: '.', dest_dir: '/dist', paths: ['dist/**'] }] },
  ],
  depends: ['test - node ' + version],
};

local task_deploy_repository() = {
  name: 'deploy repository.ercole.io',
  approval: true,
  runtime: {
    type: 'pod',
    arch: 'amd64',
    containers: [
      { image: 'curlimages/curl' },
    ],
  },
  environment: {
    REPO_USER: { from_variable: 'repo-user' },
    REPO_TOKEN: { from_variable: 'repo-token' },
    REPO_UPLOAD_URL: { from_variable: 'repo-upload-url' },
    REPO_INSTALL_URL: { from_variable: 'repo-install-url' },
  },
  steps: [
    { type: 'restore_workspace', dest_dir: '.' },
    {
      type: 'run',
      name: 'curl',
      command: |||
        for f in ./pkg/*; do
        	URL=$(curl --user "${REPO_USER}" \
            --upload-file $f ${REPO_UPLOAD_URL} --insecure)
        	echo $URL
        	curl -H "X-API-Token: ${REPO_TOKEN}" \
          -H "Content-Type: application/json" --request POST --data "{ \"filename\": \"$f\", \"url\": \"$URL\" }" \
          ${REPO_INSTALL_URL} --insecure
        done
      |||,
    },
  ],
  depends: ['pkg build'],
  when: {
    branch: 'master',
    ref: {
      exclude: ['#/refs/pull/.*#'],
    },
  },
};

local task_build_push_image(push) =
  /*
   * Currently, kaniko, has some issues with multi stage builds where it removes
   * all the files in the container after every stage (excluding /kaniko) causing
   * file not found errors when doing COPY commands.
   * Workaround this buy putting all files inside /kaniko
   */
  local options = if !push then '--no-push' else '--destination sorintlab/ercole-web:$AGOLA_GIT_TAG';
  {
    name: 'build image' + if push then ' and push' else '',
    runtime: {
      arch: 'amd64',
      containers: [
        {
          image: 'gcr.io/kaniko-project/executor:debug-v0.11.0',
        },
      ],
    },
    environment: {
      DOCKERAUTH: { from_variable: 'dockerauth' },
    },
    shell: '/busybox/sh',
    working_dir: '/kaniko',
    steps: [
      { type: 'run', command: 'ls -rl' },
      { type: 'restore_workspace', dest_dir: '/kaniko/ercole-web' },
    ] + std.prune([
      if push then {
        type: 'run',
        name: 'generate docker auth',
        command: |||
          cat << EOF > /kaniko/.docker/config.json
          {
            "auths": {
              "https://index.docker.io/v1/": { "auth" : "$DOCKERAUTH" }
            }
          }
          EOF
        |||,
      },
    ]) + [
      { type: 'run', command: '/kaniko/executor --context=dir:///kaniko/ercole-web --dockerfile Dockerfile %s' % [options] },
    ],
    depends: ['checkout code'],
  };

{
  runs: [
    {
      name: 'ercole-web',
      tasks: std.flattenArrays([
               [
                 task_test(version),
               ]
               for version in ['12']
             ]) +
             std.flattenArrays([
               [
                 task_build(version),
               ]
               for version in ['12']
             ]) + [

        local version = '12';
        {
          name: 'pkg build',
          runtime: {
            type: 'pod',
            arch: 'amd64',
            containers: [
              { image: 'ruby:3-buster' },
            ],
          },
          steps: [
            { type: 'restore_workspace', dest_dir: '.' },
            {
              type: 'run',
              name: 'version',
              command: |||
                if [ -z ${AGOLA_GIT_TAG} ] || [[ ${AGOLA_GIT_TAG} == *-* ]]; then 
                  export VERSION=latest
                else
                  export VERSION=${AGOLA_GIT_TAG}
                fi
                echo VERSION: ${VERSION}
                echo "export VERSION=${VERSION}" > /tmp/variables
              |||,
            },
            //TODO { type: 'restore_cache', keys: ['cache-apt-date-'], dest_dir: '/var/cache/apt/archives/' },
            //TODO { type: 'save_cache', key: 'cache-apt-date-{{ year }}-{{ month }}-{{ day }}', contents: [{ source_dir: '/var/cache/apt/archives/' }] },
            { type: 'run', command: 'apt update' },
            { type: 'run', command: 'apt install rpm --yes' },
            { type: 'run', command: 'mkdir -p /tmp/dist' },
            { type: 'run', command: 'gem install --no-document fpm' },
            { type: 'run', command: '. /tmp/variables && tar -C dist -czf /tmp/dist/ercole-web-${VERSION}.tar.gz .' },
            { type: 'run', command: '. /tmp/variables && fpm -n ercole-web -s dir -t rpm -a all --rpm-os linux --version ${VERSION} --name ercole-web --after-install after-install  -s dir dist/=/usr/share/ercole/web ercoleweb-setup=/usr/bin/ercoleweb-setup nginx-serve-ercoleweb-https.conf=/usr/share/ercole/examples/nginx-serve-ercoleweb-https.conf' },
            { type: 'run', command: '. /tmp/variables && mv ercole-web-${VERSION}-1.noarch.rpm /tmp/dist/ercole-web-${VERSION}-1.el8.noarch.rpm' },
            { type: 'run', command: '. /tmp/variables && cp /tmp/dist/ercole-web-${VERSION}-1.el8.noarch.rpm /tmp/dist/ercole-web-${VERSION}-1.el7.noarch.rpm' },
            { type: 'save_to_workspace', contents: [{ source_dir: '/tmp/dist', dest_dir: '/pkg/', paths: ['**'] }] },
          ],
          depends: ['checkout code'],
        },
      ] + [
        task_deploy_repository(),
      ] + [
        {
          name: 'checkout code',
          runtime: {
            arch: 'amd64',
            containers: [
              {
                image: 'alpine/git',
              },
            ],
          },
          steps: [
            { type: 'clone' },
            { type: 'save_to_workspace', contents: [{ source_dir: '.', dest_dir: '.', paths: ['**'] }] },
          ],
          depends: ['build - node 12'],
        },
      ] + [
        task_build_push_image(false) + {
          when: {
            ref: '#refs/pull/\\d+/head#',
          },
        },
        task_build_push_image(true) + {
          when: {
            branch: 'master',
            tag: '#v.*#',
          },
        },
      ] + [
        {
          name: 'redeploy dev.ercole.io',
          runtime: {
            type: 'pod',
            arch: 'amd64',
            containers: [
              { image: 'curlimages/curl' },
            ],
          },
          environment: {
            REDEPLOY_URL: { from_variable: 'redeploy-url' },
          },
          steps: [
            {
              type: 'run',
              name: 'curl request',
              command: |||
                curl --location --request POST ${REDEPLOY_URL} \
                  --header 'Content-Type: application/json' \
                  --data-raw '{ "namespace": "ercole", "podname" : "ercole-web" }' \
                  --insecure
              |||,
            },
          ],
          depends: ['build image and push'],
        },
      ],
    },
  ],
}
