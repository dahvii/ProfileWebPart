import pnp from "sp-pnp-js";


export default class ListHelper {
    private static listTitle = "Newly Hired List";
    private static listDescription = "A list for the Newly Hired App";
    private static reqFieldName1 = "CompanyPosition";
    private static reqFieldName2 = "StartDate";
    private static reqFieldName3 = "Title";
    private static optFieldName1 = "ProfileText";
    private static optFieldName2 = "Image";



    public static getListNames(): any[] {
        var listToChooseFrom = [];

        pnp.sp.web.lists.filter("Hidden eq false").get().then(result => {
            let filteredList = result.filter((list) => {
                return list.BaseTemplate == 100;
            });

            filteredList.forEach(list => {
                pnp.sp.web.lists.getByTitle(list.Title).fields.get().then(fields => {
                    let requiredFields = fields.filter((field) => {
                        return (field.StaticName == this.reqFieldName1 && field.Required == true) ||
                            (field.StaticName == this.reqFieldName2 && field.Required == true) ||
                            (field.StaticName == this.reqFieldName3 && field.Required == true);
                    });

                    if (requiredFields.length == 3) {
                        listToChooseFrom.push({ key: list.Title, text: list.Title });
                    }
                });
            });
        });

        return listToChooseFrom;
    }

    public static getExistingList(listChoice) {
        return new Promise((resolve: (success?: any) => void, reject: (error: any) => void): void => {
            let listName = listChoice ? listChoice : this.listTitle;

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
                    list.push(person);
                });

                resolve(list);
            }, (errorMessage) => {
                reject(errorMessage);
            });
        });
    }

    public static createList() {
        return new Promise((resolve: (success?: any) => void, reject: (error: any) => void): void => {
            let self = this;
            pnp.sp.web.lists.add(this.listTitle, this.listDescription, 100, true).then((splist) => {
                pnp.sp.web.lists.getByTitle(self.listTitle).fields.addMultilineText(self.optFieldName1).then(() => {
                    splist.list.defaultView.fields.add(self.optFieldName1);
                    pnp.sp.web.lists.getByTitle(self.listTitle).fields.addUrl(self.optFieldName2).then(() => {
                        splist.list.defaultView.fields.add(self.optFieldName2);
                        pnp.sp.web.lists.getByTitle(self.listTitle).fields.addText(self.reqFieldName1, 25, { Required: true }).then(() => {
                            splist.list.defaultView.fields.add(self.reqFieldName1);
                            pnp.sp.web.lists.getByTitle(self.listTitle).fields.addDateTime(self.reqFieldName2, undefined, undefined, undefined, { Required: true }).then(() => {
                                splist.list.defaultView.fields.add(self.reqFieldName2);
                            });
                        });
                    });
                });

                pnp.sp.web.lists.getByTitle(self.listTitle).expand('RootFolder, ParentWeb').select('RootFolder/ServerRelativeUrl').get().then((result) => {
                    let listUrl = location.protocol + "//" + location.hostname + result.RootFolder.ServerRelativeUrl;
                    resolve(listUrl);
                });

            }).catch((errorMessage) => {
                reject(errorMessage);
            });
        });
    }
}
