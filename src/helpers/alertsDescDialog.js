import { DialogProgrammatic as Dialog } from 'buefy'
import { resolveSeverityIcon } from '@/helpers/helpers.js'
import formatDateTime from '@/filters/formatDateTime.js'
import i18n from '@/i18n.js'

export const descriptionAlertDialog = (data) => {
  Dialog.alert({
    title: i18n.t('views.alerts.descModalTitle'),
    message: `
      <p><b>${data.code}</b></p>
      <p>${data.host}</p>
      <p>${data.categ}</p>
      <p>${formatDateTime(data.date)}</p>
      <br>
      <p style="white-space: break-spaces;">${data.desc}</p>
    `,
    confirmText: i18n.t('common.general.close'),
    size: 'is-small',
    hasIcon: true,
    iconPack: 'mdi',
    icon: resolveSeverityIcon(data.severity)[0],
    type: resolveSeverityIcon(data.severity)[1],
  })
}
