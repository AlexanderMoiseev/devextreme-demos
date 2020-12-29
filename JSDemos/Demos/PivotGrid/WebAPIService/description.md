The **PivotGrid** can communicate with a Web API service. The quantity of aggregated data is irrelevant when aggregation is performed on the server. For example, the UI component works with a million aggregated records in this demo.

To configure access to a Web API service from the client, use the <a href="https://github.com/DevExpress/DevExtreme.AspNet.Data/blob/master/docs/client-side-with-jquery.md#api-reference" target="_blank">createStore</a> method, which is part of the <a href="https://github.com/DevExpress/DevExtreme.AspNet.Data#devextreme-aspnet-data" target="_blank">DevExtreme.AspNet.Data</a> extension. This extension also allows you to <a href="https://github.com/DevExpress/DevExtreme.AspNet.Data/blob/master/docs/server-side-configuration.md" target="_blank">configure server-side data processing</a> for DevExtreme widgets.

You should also set the [remoteOperations](/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Configuration/#remoteOperations) option to **true** to notify the **PivotGrid** that data is aggregated on the server.