/**
 * Created by u on 2017/7/19.
 */
export default {
    addTab(state,tab){
      state.tabs.push(tab);
    },
  removeTab(state,tab){
      let tabs = state.tabs;
      for(let i=0;i<tabs.length;i++){
        if(tabs[i].tabName===tab.tabName){
          tabs[i].show=false;
          return ;
        }
      }
    },
    user(state,user){
      state.user=user;
    },
    menus(state,menus){
      state.menus=menus;
    },
    openTab(state,tab){//如果已知tab已存在，激活tab时，参数用｛tabName:''｝
      let tabs = state.tabs;
         for(let i=0;i<tabs.length;i++){
              if(tabs[i].tabName===tab.tabName){
                tabs[i].show=true;
                state.activeTab=tabs[i];
                return ;
              }
         }
          state.tabs.push(tab);
          state.activeTab=tab;
      console.log("in-mutations",state.tabs);
    }

}
