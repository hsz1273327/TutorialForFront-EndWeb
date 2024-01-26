# native-helloworld

本项目使用nativescript-vue构造.

## 使用方法

`ns run ios`或`ns run android`


<!-- <CollectionView ref="collection" :items="itemList" colWidth="50%" rowHeight="100" orientation="vertical" @itemTap="tapItem" -->

                <Pager ref="pager" :items="itemList" height="100%" peaking="30" spacing="10" pagesCount="3" canGoRight="true" canGoLeft="true" circularMode="" true :autoPlay="autoPlay">