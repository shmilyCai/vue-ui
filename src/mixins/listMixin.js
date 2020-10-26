import moment from "moment";
export const listMixin = {
  data() {
    return {
      listRequest: {//请求参数
        pageSize: 10,
        pageNo: 1,
        sort: "desc",
      },
      pagination: {//分页信息
        size: 10,
        current: 1,
        total: 0
      },
      dataSource: [],//列表数据源
      formModalVisible: false,//新增/编辑弹窗是否弹出
      formData: {},//新增/编辑弹窗的数据。
      handleType: "add",//弹窗状态，add-新增，edit-编辑
    }
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * 新增
     */
    addFuc(e, v) {
      this.handleType = "add";
      this.formModalVisible = true;
      this.formData = {};
    },
    /**
     * 编辑
     * @param {*} e 
     * @param {*} v 
     */
    modifyFuc(e, v) {
      this.handleType = "edit";
      // this.formData = e.record;
      this.formData = Object.assign({}, e.record)
      this.formModalVisible = true;
    },
    /**
     * 删除
     */
    deleteFuc(e) {
      if (!this.api.listDeleteApi) {
        this.$message.warn("请先设置api.listDeleteApi");
        return;
      }
      if (typeof this.api.listDeleteApi !== "function") {
        this.$message.warn("api.listDeleteApi不是有效的function");
        return;
      }
      this.api.listDeleteApi({ id: e.id }).then(() => {
        this.$message.success("删除成功");
        this.getList();
      });
    },
    /**
     * 批量删除
     */
    batchDeleteFuc(i, v = {}) {
      alert(`删除的id${v.selectedRowKeys.join(",")}`)
    },
    /**
     * 获取列表
     * @param {} req 
     */
    getList(req = {}) {
      if (!this.api.listApi) {
        // this.$message.warn("请先设置api.listApi");
        return;
      }
      if (typeof this.api.listApi !== "function") {
        // this.$message.warn("api.listApi不是有效的function");
        return;
      }
      let request = Object.assign(this.listRequest, req);
      this.api.listApi(request).then((result = {}) => {
        //逻辑处理
        let { total = 0, size = 10, current = 1 } = result;
        this.pagination = {
          total: Number(total),
          size: Number(size),
          current: Number(current),
        }
        this.dataSource = result?.records || [];
        // 白名单字段
        const whiteName = ['state', 'push']
        for (let i of this.dataSource) {
          for (let s in i) {
            if (i[s] === 0 && whiteName.indexOf(s) === -1) {
              i[s] = '0'
            }
          }
        }
      })
        .catch(() => {
          this.dataSource = [];
        })
    },
    /**
     * 导出
     */
    onExport() {

    },
    /**
     * 日期组件默认禁用当前日期之后。
     * @param {*} current 
     */
    disabledDate(current) {
      return current && current > moment().endOf("day");
    },
    /**
     * 格式化时间格式
     */
    dateFormat(tamp, fmt = "YYYY-MM-DD HH:mm:ss") {
      if (!tamp) {
        return "-"
      }
      return moment(tamp).format(fmt);
    },
    /**
     * 排序
     */
    handleTableChange(pagination, filters, sorter) {
      let { order, field } = sorter;
      this.listRequest.pageNo = 1;
      this.listRequest.sort = order == "ascend" ? "asc" : "desc";
      this.listRequest.orderBy = order ? field : this.defaultOrderBy;
      this.getList();
      console.log(sorter, this.listRequest)
    },
  },
}