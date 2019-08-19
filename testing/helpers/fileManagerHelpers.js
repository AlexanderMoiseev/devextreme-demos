import $ from "jquery";

export const Consts = {
    WIDGET_CLASS: "dx-filemanager",
    TOOLBAR_CLASS: "dx-filemanager-toolbar",
    GENERAL_TOOLBAR_CLASS: "dx-filemanager-general-toolbar",
    FILE_TOOLBAR_CLASS: "dx-filemanager-file-toolbar",
    CONTAINER_CLASS: "dx-filemanager-container",
    DIALOG_CLASS: "dx-filemanager-dialog",
    THUMBNAILS_ITEM_CLASS: "dx-filemanager-thumbnails-item",
    GRID_DATA_ROW_CLASS: "dx-data-row",
    FILE_ACTION_BUTTON_CLASS: "dx-filemanager-file-actions-button",
    FOLDERS_TREE_VIEW_ITEM_CLASS: "dx-treeview-item",
    FOLDERS_TREE_VIEW_ITEM_TOGGLE_CLASS: "dx-treeview-toggle-item-visibility",
    BREADCRUMBS_CLASS: "dx-filemanager-breadcrumbs",
    ITEMS_GRID_VIEW_CLASS: "dx-filemanager-files-view",
    FOCUSED_ITEM_CLASS: "dx-filemanager-focused-item",
    CUSTOM_THUMBNAIL_CLASS: "dx-filemanager-item-custom-thumbnail",
    TOOLBAR_SEPARATOR_ITEM: "dx-filemanager-toolbar-separator-item",
    DETAILS_ITEM_NAME_CLASS: "dx-filemanager-details-item-name",
    POPUP_BOTTOM_CLASS: "dx-popup-bottom",
    BUTTON_CLASS: "dx-button",
    BUTTON_TEXT_CLASS: "dx-button-text",
    SELECT_BOX_CLASS: "dx-selectbox",
    TEXT_EDITOR_INPUT_CLASS: "dx-texteditor-input",
    MENU_ITEM_WITH_TEXT_CLASS: "dx-menu-item-has-text",
    CONTEXT_MENU_CLASS: "dx-context-menu",
    MENU_ITEM_CLASS: "dx-menu-item",
    SELECTION_CLASS: "dx-selection"
};
const showMoreButtonText = "\u22EE";

export class FileManagerWrapper {

    constructor($element) {
        this._$element = $element;
    }

    getInstance() {
        return this._$element.dxFileManager("instance");
    }

    getFolderNodes(inDialog) {
        if(inDialog) {
            return $(`.${Consts.DIALOG_CLASS} .${Consts.FOLDERS_TREE_VIEW_ITEM_CLASS}`);
        }
        return this._$element.find(`.${Consts.CONTAINER_CLASS} .${Consts.FOLDERS_TREE_VIEW_ITEM_CLASS}`);
    }

    getFolderNode(index, inDialog) {
        return this.getFolderNodes(inDialog).eq(index);
    }

    getFolderNodeText(index, inDialog) {
        const text = this.getFolderNode(index, inDialog).text() || "";
        return text.replace(showMoreButtonText, "");
    }

    getFolderToggles(inDialog) {
        if(inDialog) {
            return $(`.${Consts.DIALOG_CLASS} .${Consts.FOLDERS_TREE_VIEW_ITEM_TOGGLE_CLASS}`);
        }
        return this._$element.find(`.${Consts.CONTAINER_CLASS} .${Consts.FOLDERS_TREE_VIEW_ITEM_TOGGLE_CLASS}`);
    }

    getFolderToggle(index, inDialog) {
        return this.getFolderToggles(inDialog).eq(index);
    }

    getFocusedItemText() {
        return this._$element.find(`.${Consts.CONTAINER_CLASS} .${Consts.FOCUSED_ITEM_CLASS} span`).text();
    }

    getFolderActionButton(index) {
        const $folderNode = this.getFolderNode(index);
        return this._findActionButton($folderNode);
    }

    getBreadcrumbsPath() {
        let result = "";
        const $elements = this._$element.find(`.${Consts.BREADCRUMBS_CLASS} .${Consts.MENU_ITEM_WITH_TEXT_CLASS}`);
        $elements.each((_, element) => {
            const name = $(element).text();
            result = result ? `${result}/${name}` : name;
        });
        return result;
    }

    getToolbar() {
        return this._$element.find(`.${Consts.TOOLBAR_CLASS}`);
    }

    getToolbarElements() {
        return this._$element.find(`.${Consts.TOOLBAR_CLASS} .${Consts.BUTTON_TEXT_CLASS}:visible, .${Consts.TOOLBAR_CLASS} .${Consts.SELECT_BOX_CLASS}:visible input[type='hidden']`);
    }

    getToolbarButton(text) {
        return this._$element.find(`.${Consts.TOOLBAR_CLASS} .${Consts.BUTTON_CLASS}:contains('${text}')`);
    }

    getToolbarSeparators() {
        return this._$element.find(`.${Consts.TOOLBAR_CLASS} .${Consts.TOOLBAR_SEPARATOR_ITEM}:visible`);
    }

    getCustomThumbnails() {
        return this._$element.find(`.${Consts.CUSTOM_THUMBNAIL_CLASS}`);
    }

    findThumbnailsItem(itemName) {
        return this._$element.find(`.${Consts.THUMBNAILS_ITEM_CLASS}:contains('${itemName}')`);
    }

    findDetailsItem(itemName) {
        return this._$element.find(`.${Consts.GRID_DATA_ROW_CLASS} > td:contains('${itemName}')`);
    }

    getDetailsItemName(index) {
        return this._$element.find(`.${Consts.DETAILS_ITEM_NAME_CLASS}`).eq(index).text();
    }

    getRowActionButtonInDetailsView(index) {
        const $row = this.getRowInDetailsView(index);
        return this._findActionButton($row);
    }

    getSelectCheckBoxInDetailsView(index) {
        return this.getRowInDetailsView(index).find("td").eq(0);
    }

    getRowNameCellInDetailsView(index) {
        return this.getRowInDetailsView(index).find("td").eq(1);
    }

    getRowInDetailsView(index) {
        return this._$element.find(`.${Consts.GRID_DATA_ROW_CLASS}[aria-rowindex=${index}]`);
    }

    getContextMenuItems(visible) {
        let selector = `.${Consts.CONTEXT_MENU_CLASS} .${Consts.MENU_ITEM_CLASS}`;
        if(visible) {
            selector += ":visible";
        }
        return $(selector);
    }

    getContextMenuItem(text) {
        return this.getContextMenuItems(true).filter(`:contains('${text}')`);
    }

    _findActionButton($container) {
        return $container.find(`.${Consts.FILE_ACTION_BUTTON_CLASS} .${Consts.BUTTON_CLASS}`);
    }

}

export class FileManagerProgressPanelWrapper {

    constructor($element) {
        this._$element = $element;
    }

    getInfos() {
        return this._$element
            .find(".dx-filemanager-progress-panel-infos-container > .dx-filemanager-progress-panel-info")
            .map((_, info) => new FileManagerProgressPanelInfoWrapper($(info)))
            .get();
    }

    findProgressBoxes($container) {
        return $container
            .children(".dx-filemanager-progress-box")
            .map((_, element) => new FileManagerProgressPanelProgressBoxWrapper($(element)))
            .get();
    }

    findError($container) {
        return $container.find(".dx-filemanager-progress-box-error");
    }

    get $closeButton() {
        return this._$element.find(".dx-filemanager-progress-panel-close-button");
    }

}

export class FileManagerProgressPanelInfoWrapper {

    constructor($element) {
        this._$element = $element;
    }

    get common() {
        const $common = this._$element.find(".dx-filemanager-progress-panel-common");
        return new FileManagerProgressPanelProgressBoxWrapper($common);
    }

    get details() {
        return this._$element
            .find(".dx-filemanager-progress-panel-details > .dx-filemanager-progress-box")
            .map((_, detailsInfo) => new FileManagerProgressPanelProgressBoxWrapper($(detailsInfo)))
            .get();
    }

}

export class FileManagerProgressPanelProgressBoxWrapper {

    constructor($element) {
        this._$element = $element;
    }

    get $element() {
        return this._$element;
    }

    get $commonText() {
        return this._$element.find(".dx-filemanager-progress-box-common");
    }

    get commonText() {
        return this.$commonText.text();
    }

    get $progressBar() {
        return this._$element.find(".dx-filemanager-progress-box-progress-bar");
    }

    get progressBar() {
        return this.$progressBar.dxProgressBar("instance");
    }

    get progressBarStatusText() {
        return this.$progressBar.find(".dx-progressbar-status").text();
    }

    get progressBarValue() {
        return this.progressBar.option("value");
    }

    get $closeButton() {
        return this._$element.find(".dx-filemanager-progress-box-close-button");
    }

    get closeButton() {
        return this.$closeButton.dxButton("instance");
    }

    get closeButtonVisible() {
        return this.closeButton.option("visible");
    }

    get $image() {
        return this._$element.find(".dx-filemanager-progress-box-image");
    }

    get $error() {
        return this._$element.find(".dx-filemanager-progress-box-error");
    }

    get errorText() {
        return this.$error.text();
    }

    get hasError() {
        return this.$error.length !== 0;
    }

}

export const stringify = obj => {
    if(Array.isArray(obj)) {
        const content = obj
            .map(item => stringify(item))
            .join(",\n");
        return `[ ${content} ]`;
    }

    if(typeof obj !== "object") {
        return JSON.stringify(obj);
    }

    let props = Object
        .keys(obj)
        .map(key => `${key}: ${stringify(obj[key])}`)
        .join(", ");
    return `{ ${props} }`;
};

export const createTestFileSystem = () => {
    return [
        {
            name: "Folder 1",
            isDirectory: true,
            items: [
                {
                    name: "Folder 1.1",
                    isDirectory: true,
                    items: [
                        {
                            name: "File 1-1.txt",
                            isDirectory: false
                        },
                        {
                            name: "File 1-2.txt",
                            isDirectory: false
                        },
                        {
                            name: "File 1-3.png",
                            isDirectory: false
                        },
                        {
                            name: "File 1-4.jpg",
                            isDirectory: false
                        }]
                },
                {
                    name: "Folder 1.2",
                    isDirectory: true
                },
                {
                    name: "File 1-1.txt",
                    isDirectory: false
                },
                {
                    name: "File 1-2.jpg",
                    isDirectory: false
                }]
        },
        {
            name: "Folder 2",
            isDirectory: true,
            items: [
                {
                    name: "File 2-1.jpg",
                    isDirectory: false
                }]
        },
        {
            name: "Folder 3",
            isDirectory: true
        },
        {
            name: "File 1.txt",
            isDirectory: false
        },
        {
            name: "File 2.jpg",
            isDirectory: false
        },
        {
            name: "File 3.xml",
            isDirectory: false
        }
    ];
};
