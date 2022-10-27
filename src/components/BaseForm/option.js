export const  option = {
  border: true,
  column: [
    {
      prop: 'number',
      label: '数量',
      type: 'select',
      placeholder: '数量',
      dic: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '一个',
          value: '1'
        },
        {
          label: '两个',
          value: '2'
        }
      ],
      rules: [
        {
          required: true
        }
      ]
    },
    {
      prop: 'sex',
      label: '性别',
      type: 'radio',
      dic: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '0'
        }
      ],
      rules: [
        {
          required: true
        }
      ],
      formatText(val) {
        console.log(val)
      }
    },
    {
      prop: 'hobby',
      label: '爱好',
      type: 'checkbox',
      dic: [
        {
          label: '篮球',
          value: '1'
        },
        {
          label: '排球',
          value: '2'
        },
        {
          label: '足球',
          value: '3'
        }
      ],
      rules: [
        {
          required: true
        }
      ]
    },
    {
      prop: 'address',
      label: '地址',
      type: 'cascader',
      dic: [
        {
          label: '福建',
          value: 'fujian',
          children: [
            {
              label: '漳州',
              value: 'zhangzhou'
            },
            {
              label: '厦门',
              value: 'xiamen'
            }
          ]
        },
        {
          label: '浙江',
          value: 'zhejiang',
          children: [
            {
              label: '杭州',
              value: 'hangzhou'
            },
            {
              label: '绍兴',
              value: 'shaoxing'
            }
          ]
        }
      ],
      rules: [
        {
          required: true
        }
      ]
    },
    {
      prop: 'date',
      type: 'date',
      label: '日期',
      span: 8
    }
  ]
}