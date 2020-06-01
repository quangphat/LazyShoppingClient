import * as H from 'history';
import { IAccount } from '../Models/IAccount'
import { createBrowserHistory } from 'history';
import { IAuthor } from '../Models/IAuthor';
export const history = createBrowserHistory();

export const getNewGuid = (): string => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export const isNullOrWhiteSpace = (str: string): boolean => {
    if (str == null || str === '' || str == undefined || str.trim() == '')
        return true
    return false;
}
export const isNullOrUndefined = (obj: any): boolean => {
    if (obj == null || obj === '' || obj == undefined)
        return true
    return false;
}
export const isArrNullOrHaveNoItem = (arr: any[]): boolean => {
    if (arr == null || arr.length == 0 || arr == undefined)
        return true
    return false;
}
export const getParamSingle = (search: string, param: string): any => {
    let queries = new URLSearchParams(search);
    if (queries.get(param)) {
        return queries.get(param)
    }
    return null
}
export const joinObject = (obj: Object) => {
    let path = '', arr_keyParams = Object.keys(obj)
    arr_keyParams.map(key => {
        if ((obj[key] || obj[key] === 0) && obj[key] != null) {
            path += '&' + key + '=' + obj[key]
        }
    })
    path = path.substring(1)
    return path
}
export const buildSearchQuery = (locationPathname: string, paging: Object): string => {
    return locationPathname + '?' + joinObject(paging)
}

const nonUnicodeChars = new Array("a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "d",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
    "i", "i", "i", "i", "i",
    "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
    "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
    "y", "y", "y", "y", "y", "-", "-", "-",
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "D",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "I", "I", "I", "I", "I",
    "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
    "Y", "Y", "Y", "Y", "Y",
);
const unicodeChars = new Array("á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
    "đ",
    "é", "è", "ẻ", "ẽ", "ẹ", "ê", "ế", "ề", "ể", "ễ", "ệ",
    "í", "ì", "ỉ", "ĩ", "ị",
    "ó", "ò", "ỏ", "õ", "ọ", "ô", "ố", "ồ", "ổ", "ỗ", "ộ", "ơ", "ớ", "ờ", "ở", "ỡ", "ợ",
    "ú", "ù", "ủ", "ũ", "ụ", "ư", "ứ", "ừ", "ử", "ữ", "ự",
    "ý", "ỳ", "ỷ", "ỹ", "ỵ", " ", "<", ">",
    "Á", "À", "Ả", "Ã", "Ạ", "Â", "Ấ", "Ầ", "Ẩ", "Ẫ", "Ậ", "Ă", "Ắ", "Ằ", "Ẳ", "Ẵ", "Ặ",
    "Đ",
    "É", "È", "Ẻ", "Ẽ", "Ẹ", "Ê", "Ế", "Ề", "Ể", "Ễ", "Ệ",
    "Í", "Ì", "Ỉ", "Ĩ", "Ị",
    "Ó", "Ò", "Ỏ", "Õ", "Ọ", "Ô", "Ố", "Ồ", "Ổ", "Ỗ", "Ộ", "Ơ", "Ớ", "Ờ", "Ở", "Ỡ", "Ợ",
    "Ú", "Ù", "Ủ", "Ũ", "Ụ", "Ư", "Ứ", "Ừ", "Ử", "Ữ", "Ự",
    "Ý", "Ỳ", "Ỷ", "Ỹ", "Ỵ",
);
export function NonUnicode(value: string, toLowerCase: boolean = true) {
    if (value != null && value.length > 0) {
        value = toLowerCase ? value.trim().toLowerCase() : value.trim();
        var outString = value;
        var stringLength = 0;
        var countSpace = 0;

        while (stringLength < value.length) {
            if (value[stringLength] == " ")
                countSpace++;
            else
                countSpace = 0;

            if (countSpace > 1)
                outString = outString.replace(" ", "");
            else {
                var idx = unicodeChars.indexOf(value[stringLength]);
                if (idx != -1) {
                    outString = outString.replace(unicodeChars[idx], nonUnicodeChars[idx]);
                }
            }
            stringLength++;
        }

        return outString;
    }

    return value;
}
export const GetAccount = (): IAccount => {
    if (isLogin() == false) return null
    let account = document['account'] as IAccount
    return account;
}
export const isLogin = (): boolean => {
    let account = document['account'] as IAccount
    if (isNullOrUndefined(account)) return false;
    if (isNullOrWhiteSpace(account.personId)
        || isNullOrUndefined(account.projectId)
        || isNullOrWhiteSpace(account.email))
        return false;
    return true;
}

export const getAuthor = (): IAuthor => {
    if (isLogin() == false) return null
    let account = document['account'] as IAccount
    let author = {
        firstName: account.firstname,
        lastName: account.lastname,
        avatar: account.avatar,
        email: account.email,
        projectId: account.projectId,
        displayName: account.displayName,
        profileName: account.profileName,
        id: account.personId
    } as IAuthor
    return author;
}
export const isValidPassword = (input: string): boolean => {
    var rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&.]{8,}$/;
    if (rePassword.test(input))
        return true;
    return false;
}
export const IsEmail = (email: string): boolean => {
    var reEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return reEmail.test(email);
}
export const JoinFullName = (lastName: string, firstName: string, isDisplay: boolean = true): string => {
    let fullName = '';
    if (!isNullOrWhiteSpace(lastName) || !isNullOrWhiteSpace(firstName)) {
        if (!isNullOrWhiteSpace(lastName)) {
            fullName = lastName;
        }
        if (!isNullOrWhiteSpace(firstName)) {
            fullName += ' ' + firstName;
        }
    }
    else {
        if (isDisplay == true)
            fullName = '---';
        else
            fullName = '';
    }
    return fullName.trim();
}
export const getListYear = (min: number = 1959) => {
    let thisYear = new Date().getFullYear()

    let years = []
    for (let y = thisYear; y > min; y--) {
        years.push({ value: y.toString(), display: y.toString() })
    }
    return years;
}
export const ListMonth = [
    { value: '1', display: 'Tháng 1' },
    { value: '2', display: 'Tháng 2' },
    { value: '3', display: 'Tháng 3' },
    { value: '4', display: 'Tháng 4' },
    { value: '5', display: 'Tháng 5' },
    { value: '6', display: 'Tháng 6' },
    { value: '7', display: 'Tháng 7' },
    { value: '8', display: 'Tháng 8' },
    { value: '9', display: 'Tháng 9' },
    { value: '10', display: 'Tháng 10' },
    { value: '11', display: 'Tháng 11' },
    { value: '12', display: 'Tháng 12' }
]