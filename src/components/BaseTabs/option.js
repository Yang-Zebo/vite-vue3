import BaseForm from '@/components/BaseForm/index.vue'
import BaseTable from '@/components/BaseTable/index.vue'
const option = {
  tabList: [
    {
      name: 'BaseTable',
      label: 'BaseTable',
      component: BaseTable,
      option: []
    },
    {
      name: 'BaseForm',
      label: 'BaseForm',
      component: BaseForm,
      option: []
    }
  ]
}
export default option