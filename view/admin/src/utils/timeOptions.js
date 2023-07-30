export default {
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '昨天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(
          start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)),
        );
        end.setTime(end.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)));
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近7天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '最近30天',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '本月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
        picker.$emit('pick', [start, end]);
      },
    },
    {
      text: '本年',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.setTime(new Date(new Date().getFullYear(), 0, 1)));
        picker.$emit('pick', [start, end]);
      },
    },
  ],
};
