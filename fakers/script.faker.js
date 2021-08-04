categories = require('./categories_data.json');
subCategories = require('./subCategories_data.json');

Lib = require('./categories.faker')

let saveId = []

findCategory = (category, saveId) => {
    let response = false;
    saveId.forEach(element => {
            // console.log("element.name = ", element.name);
            // console.log("category.category = ", category.category)
            if (element.name === category.category) {
                // console.log("return", element.id)
                response = element.id;
            }
        }
    )
    return response;
}

exploitSaveId = (saveId) => {
    subCategories.forEach((subCategory) => {
        subCategory.category = findCategory(subCategory, saveId);
    })
    return subCategories;
}

Lib.pushCategories(categories)
    .then(r => exploitSaveId(saveId))
    // .then(r => console.log("okay", r))
    .then(r => Lib.pushSubCategories(r))
    .then(r => console.log('okay', r));

console.log("fin du script")