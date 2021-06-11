import Vue from 'vue';

import {
  Container,
  Aside,
  Main,
  Input,
  Button,
  Row,
  Col,
  Tag,
  Divider,
  Menu,
  Submenu,
  MenuItem,
  Dialog,
  Form,
  FormItem,
  DatePicker,
  Table,
  TableColumn,
  Message,
  Loading,
  Select,
  Option,
  Tabs,
  TabPane,
  Checkbox,
  CheckboxGroup,
  Link,

} from 'element-ui';

Vue.use(Container);
Vue.use(Aside);
Vue.use(Tag);
Vue.use(Main);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Divider);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Link);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;

Vue.prototype.$message = Message;
