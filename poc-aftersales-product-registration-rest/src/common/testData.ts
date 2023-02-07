export class TestData{
    public static mockBrand: Object = {"_id": "61c90f4b9873da63e851ccf9",
        "brand": "Super General",};

    public static mockCategory: Object = { "_id": "61c1ae8556392f12086698c5", "category": "Smart Phone",
        "brandType": "61c90f4b9873da63e851ccf9"}

    public static mockProduct : Object = {
        "_id": "61c1ae8556392f12086698c9",
        "product": "Galaxy Note JS X",
        "categoryType": "61c1ae8556392f12086698c5",
        "brandId": "61c90f4b9873da63e851ccf9"

    }

    public static mockModel: Object = {
        "_id": "61c9699472c8c39d9fc3b97c",
        "modelNo": "SS-XWR-352-SFE",
        "categoryType": "61c1ae8556392f12086698c5",
        "brandType": "61c90f4b9873da63e851ccf9",
        "productType": "61c1ae8556392f12086698c9"
    }

    public static Incorrect_BrandID_mockModel: Object = {
        "_id": "61c9699472c8c39d9fc3b97c",
        "modelNo": "SS-XWR-352-SFE",
        "categoryType": "61c1ae8556392f12086698c5",
        "brandType": "61c9761efc9a452a811b5e00",
        "productType": "61c1ae8556392f12086698c9"
    }

    public static Incorrect_CategoryID_mockModel: Object = {
        "_id": "61c9699472c8c39d9fc3b97c",
        "modelNo": "SS-XWR-352-SFE",
        "categoryType": "61c976c5c43723d8257a2dc9",
        "brandType": "61c90f4b9873da63e851ccf9",
        "productType": "61c1ae8556392f12086698c9"
    }

    public static mockRegisterModel: Object = {
        "customer": {
            "fullName": "Jeen",
            "email": "jeenxavier23@gmail.com",
            "phone": "971556363612"
        },
        "product": {
            "brand": "61c90f4b9873da63e851ccf9",
            "category": "61c1ae8556392f12086698c5",
            "model": "61c9699472c8c39d9fc3b97c",
            "serialnumber": "XXY-XX-FREWGW",
            "type": "61c1ae8556392f12086698c9",
            "invoiceDate": "21-12-2021"
        }

    }

    public static mockwithoutEmailRegisterModel: Object = {
        "customer": {
            "fullName": "Jeen",
            "email": "",
            "phone": "971556363612"
        },
        "product": {
            "brand": "61c90f4b9873da63e851ccf9",
            "category": "61c1ae8556392f12086698c5",
            "model": "61c9699472c8c39d9fc3b97c",
            "serialnumber": "XXY-XX-FREWGW",
            "type": "61c1ae8556392f12086698c9",
            "invoiceDate": "21-12-2021"
        }

    }

    public static mockwithBadphoneNumbermodel: Object = {
        "customer": {
            "fullName": "Jeen",
            "email": "",
            "phone": "971592543"
        },
        "product": {
            "brand": "61c90f4b9873da63e851ccf9",
            "category": "61c1ae8556392f12086698c5",
            "model": "61c9699472c8c39d9fc3b97c",
            "serialnumber": "",
            "type": "61c1ae8556392f12086698c9",
            "invoiceDate": "21-12-2021"
        }

    }

    public static mockNamewithSpaces: Object = {
        "customer": {
            "fullName": "Jeen /Xavier",
            "email": "jeenxavier24@gmail.com",
            "phone": "971527209148"
        },
        "product": {
            "brand": "61c90f4b9873da63e851ccf9",
            "category": "61c1ae8556392f12086698c5",
            "model": "61c9699472c8c39d9fc3b97c",
            "serialnumber": "",
            "type": "61c1ae8556392f12086698c9",
            "invoiceDate": "21-12-2021"
        }

    }

}