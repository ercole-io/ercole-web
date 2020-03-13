 
Name:           ercole-web
Version:        %{_version}
Release:        1%{?dist}
Summary:        Ercole Web

License:        GPLv3
URL:            https://ercole.io            
Source0:        https://github.com/ercole-io/%{name}/archive/%{version}.tar.gz
Group:          Daemons
Requires:       systemd createrepo nginx

%global         debug_package %{nil}

%description
Ercole is the web component of the ercole project.

%global debug_package %{nil}

%prep
rm -rf %{_builddir}/%{name}-%{version}
cp -rf %{_sourcedir}/%{name}-%{version} %{_builddir}/%{name}-%{version}
cd %{_builddir}/%{name}-%{version}
ls

%install
cd %{_builddir}/%{name}-%{version}
mkdir -p %{buildroot}/usr/share/ercole/web
cd dist
find . -type d -exec install -m 755 -d "{}" %{buildroot}/usr/share/ercole/web \;
find . -type f -exec install -m 644 "{}" %{buildroot}/usr/share/ercole/web \;

%files
%dir /usr/share/ercole/web
/usr/share/ercole/web/js
/usr/share/ercole/web/js/chunk-vendors.1ca93f67.js
/usr/share/ercole/web/js/app.f1a3a4c6.js
/usr/share/ercole/web/js/chunk-vendors.1ca93f67.js.map
/usr/share/ercole/web/js/app.f1a3a4c6.js.map
/usr/share/ercole/web/favicon.ico
/usr/share/ercole/web/fonts
/usr/share/ercole/web/fonts/fa-regular-400.e07d9e40.woff2
/usr/share/ercole/web/fonts/fa-regular-400.fc9c63c8.eot
/usr/share/ercole/web/fonts/fa-brands-400.fe9d62e0.woff
/usr/share/ercole/web/fonts/fa-solid-900.b5cf8ae2.woff2
/usr/share/ercole/web/fonts/fa-brands-400.7559b377.woff2
/usr/share/ercole/web/fonts/fa-brands-400.ed2b8bf1.ttf
/usr/share/ercole/web/fonts/fa-brands-400.03783c51.eot
/usr/share/ercole/web/fonts/fa-regular-400.e5770f98.woff
/usr/share/ercole/web/fonts/fa-solid-900.acf50f59.ttf
/usr/share/ercole/web/fonts/fa-solid-900.ef3df984.eot
/usr/share/ercole/web/fonts/fa-regular-400.59215032.ttf
/usr/share/ercole/web/fonts/fa-solid-900.4bced7c4.woff
/usr/share/ercole/web/img
/usr/share/ercole/web/img/fa-solid-900.b557f56e.svg
/usr/share/ercole/web/img/os_win.bd367f11.png
/usr/share/ercole/web/img/fa-regular-400.8fdea4e8.svg
/usr/share/ercole/web/img/fa-brands-400.073c2f3c.svg
/usr/share/ercole/web/css
/usr/share/ercole/web/css/app.a20c28b2.css
/usr/share/ercole/web/css/chunk-vendors.1155142b.css
/usr/share/ercole/web/index.html

%changelog
