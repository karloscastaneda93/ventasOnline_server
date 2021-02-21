const createCategoryList = function (categories, options = []) {
    categories.map(item => {
        options.push({
            value: item._id,
            name: item.name,
            parentId: item.parentId
        });
        if (item.children.length > 0) {
            createCategoryList(item.children, options);
        }
    });
    return options;
}

const renderCategories = function (categories) {
    const myCategories = [];
    categories.map((item, index) => {
        myCategories.push({
            label: item.name,
            value: item._id,
            children: item.children.length > 0 && renderCategories(item.children)
        });
    });
    return myCategories;
}

const getCheckedCategory = function (theObject, propCompare, toCompare) {
    let result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getCheckedCategory(theObject[i], propCompare, toCompare);
            if (result) {
                break;
            }
        }
    }
    else {
        for (let prop in theObject) {
            if (prop === propCompare) {
                if (theObject[prop] === toCompare) {
                    return theObject;
                }else {
                    return getCheckedCategory(theObject.children, propCompare, toCompare);
                }
            }

        }
    }
    return result;
}
module.exports = {
    createCategoryList,
    renderCategories,
    getCheckedCategory
}