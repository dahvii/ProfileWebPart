import pnp from "sp-pnp-js";


export default class ListHelper {
    public static getListNames(): any[] {
        var listToChooseFrom = [];

        pnp.sp.web.lists.filter("Hidden eq false").get().then(result => {
            let filteredList = result.filter((list) => {
                return list.BaseTemplate == 100;
            });

            filteredList.forEach(list => {
                pnp.sp.web.lists.getByTitle(list.Title).fields.get().then(fields => {
                    let requiredFields = fields.filter((field) => {
                        return (field.StaticName == "CompanyPosition" && field.Required == true) ||
                            (field.StaticName == "StartDate" && field.Required == true) ||
                            (field.StaticName == "Title" && field.Required == true)
                    });

                    if (requiredFields.length == 3) {
                        listToChooseFrom.push({ key: list.Title, text: list.Title })
                    }
                })
            })
        });

        return listToChooseFrom;
    }

    public static getExistingList(listChoice) {
        return new Promise((resolve: (success?: any) => void, reject: (error: any) => void): void => {
            let listName = listChoice ? listChoice : "Newly Hired List";

            pnp.sp.web.lists.getByTitle(listName).items.get().then((items: any[]) => {
                let list = [];

                items.forEach(item => {
                    let person = {
                        id: item.Id,
                        name: item.Title,
                        startDate: item.StartDate,
                        imageUrl: (item.Image ? item.Image.Url : null),
                        companyPosition: item.CompanyPosition,
                        profileText: item.ProfileText,
                    }
                    list.push(person)
                });

                resolve(list);
            }, (errorMessage) => {
                reject(errorMessage)
            });
        })
    }

    public static createList() {
        return new Promise((resolve: (success?: any) => void, reject: (error: any) => void): void => {
            let web = pnp.sp.web;
            let listTitle = "Test lista";
            let listDescription = "A list for the Newly Hired App";

            web.lists.add(listTitle, listDescription, 100, true).then(function (splist) {
                console.log(splist);
                
                web.lists.getByTitle(listTitle).fields.addMultilineText("ProfileText").then(f => {
                    splist.list.defaultView.fields.add("ProfileText");
                    web.lists.getByTitle(listTitle).fields.addUrl("Image").then(f => {
                        splist.list.defaultView.fields.add("Image");
                        web.lists.getByTitle(listTitle).fields.addText("CompanyPosition", 25, { Required: true }).then(f => {
                            splist.list.defaultView.fields.add("CompanyPosition");
                            web.lists.getByTitle(listTitle).fields.addDateTime("StartDate", undefined, undefined, undefined, { Required: true }).then(f => {
                                splist.list.defaultView.fields.add("StartDate");
                            });
                        });
                    });
                });

                web.lists.getByTitle(listTitle).expand('RootFolder, ParentWeb').select('RootFolder/ServerRelativeUrl').get().then(function (result) {
                    let listUrl = location.protocol + "//" + location.hostname + result.RootFolder.ServerRelativeUrl
                    resolve(listUrl);
                });

            }).catch(errorMessage => {
                reject(errorMessage)
            });
        })
    }
}
