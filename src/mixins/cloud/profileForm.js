import { bus } from '@/helpers/eventBus.js'
import { mapActions } from 'vuex'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'

export default {
  components: {
    AdvancedFiltersBase,
  },
  data() {
    return {
      profileForm: {
        selected: false,
      },
      isEditing: false,
      editPrivateKey: false,
    }
  },
  beforeMount() {
    bus.$on('onResetAction', () => this.resetForm())

    bus.$on('editProfile', (data) => {
      bus.$emit('onToggleEdit', true)
      this.editProfile(data)
      this.isEditing = true
    })
  },
  methods: {
    ...mapActions(['createCloudProfile', 'updateCloudProfile']),
    addUpdateProfile() {
      console.log(this.profileForm)
      if (this.isEditing) {
        this.updateCloudProfile(this.profileForm).then(() => this.resetForm())
      } else {
        this.createCloudProfile(this.profileForm).then(() => this.resetForm())
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
    resetForm() {
      this.profileForm = {
        selected: false,
      }
      this.isEditing = false
      this.editPrivateKey = false
    },
  },
  computed: {
    showRequiredSymble() {
      return this.isEditing ? '' : '*'
    },
  },
  validations() {
    return {
      profileForm: this.validationFormFields,
    }
  },
}
