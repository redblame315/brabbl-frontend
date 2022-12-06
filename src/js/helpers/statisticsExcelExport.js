import * as XLSX from 'xlsx';
import moment from 'moment';
import i18next from 'i18next';
import { UseWording } from '../utils';
const generateFileName = (customerName) => {
    let currentDate = moment().format('YYYY-MM-DD-hhmmss')
    let name = customerName.replaceAll(" ", "_")
    return currentDate + `_brabbl-data-export_${name}_user-stats_.xlsx`;
}

const getClientInfoAOA = (clientName) => {
    const currentDate = moment().format('MM.DD.YYYY, hh:mm:ss')
    const clientInfoAOA= [
        [i18next.t("key_export_client"), i18next.t("key_export_date_and_time_of_export")],
        [clientName, currentDate]
    ]
    return clientInfoAOA
}

const getHeaderAOA = () => {
    return [
        [],
        [],
        [i18next.t("key_export_user_stats")],
        []
    ]
}

const getUserTotalNumbersAOA = (customer) => {
    let totalUserCount = 0
    if(customer.users) {
        totalUserCount = customer.users.length
    }
    return [
        [i18next.t("key_export_total_number_of_registered_users"), totalUserCount],
        []
    ]
}
const calculateAge = (birthYear) => {
    console.log("year", moment().year())
    return moment().year() - Number(birthYear) +1
} 
const getAgeGroupTitle = (from, to) => {

    let prefixString = i18next.t("key_export_number_of_users_in_age_group")
    let title = prefixString
    if(from && !to) {
        title = prefixString + " < " + from 
    }
    if(!from && to) {
        title = prefixString + " > " + to 
    }
    if(from && to) {
        title = prefixString + " " + from + "-" + to
    }
    return title
}

const sortObjectProperty = (unordered) => {
    const ordered = Object.keys(unordered).sort().reduce(
        (obj, key) => { 
            obj[key] = unordered[key]; 
            return obj;
        }, 
        {}
    );
    return ordered
}
const sortObjectAndConvertToArray = (countObject, prefix) => {
    const sortedObject = sortObjectProperty(countObject)
    const sortedArray = []
    Object.keys(sortedObject).forEach(key => {
        sortedArray.push([i18next.t(prefix)+ ` '${key}'`, sortedObject[key] ])
    })
    return sortedArray

}
const getUserStatisticsAOA = (customer) => {
    const GENDER_MALE = 1
    const GENDER_FEMAIL = 2
    const users = customer.users
    if(!users) return [[]]
    let age_18 = 0, age_18_20 = 0,  age_21_24 = 0, age_25_39 = 0 , age_40_59 = 0, age_60_64 = 0, age_64 = 0, age_not_provided = 0;
    let gender_female = 0, gender_male = 0, gender_not_provided = 0;
    let post_code_not_provided = 0, city_not_provided = 0, organization_not_provided = 0, position_not_provided = 0;
    let postCodesCount = {}, cityUserCount = {}, organizationUserCount = {}, positionUserCount = {};
    //age Group
    users.forEach(user => {
        if(!user.year_of_birth) age_not_provided++;
        if(!user.gender) gender_not_provided++;
        if(user.year_of_birth) {
            const age = calculateAge(user.year_of_birth)
            if(age < 18) age_18++;
            if(age >= 18 && age <= 20) age_18_20++;
            if(age >= 21 && age <= 24) age_21_24++;
            if(age >= 25 && age <= 39) age_25_39++;
            if(age >= 40 && age <= 59) age_40_59++;
            if(age >= 60 && age <= 64) age_60_64++;
            if(age > 64) age_64++;
        }
        if(user.gender) {
            if(user.gender === GENDER_MALE) gender_male++;
            if(user.gender === GENDER_FEMAIL) gender_female++;
        }
        if(!user.postcode) {
            post_code_not_provided++;
        } else {
            if(postCodesCount[user.postcode]) {
                postCodesCount[user.postcode]++;
            } else {
                postCodesCount[user.postcode] = 1 
            }
        }
        if(!user.city) {
            city_not_provided++;
        } else {
            if(cityUserCount[user.city]) {
                cityUserCount[user.city]++;
            } else {
                cityUserCount[user.city] = 1 
            }
        }

        if(!user.organization) {
            organization_not_provided++;
        } else {
            if(organizationUserCount[user.organization]) {
                organizationUserCount[user.organization]++;
            } else {
                organizationUserCount[user.organization] = 1 
            }
        }

        if(!user. position) {
            position_not_provided++;
        } else {
            if(positionUserCount[user.position]) {
                positionUserCount[user.position]++;
            } else {
                positionUserCount[user.position] = 1 
            }
        }
    })
    const postCodesArray = sortObjectAndConvertToArray(postCodesCount, 'key_export_users_with_post_code', 'postcode')

    const cityUserCountArray = sortObjectAndConvertToArray(cityUserCount, 'key_export_users_with_city', 'city')
    const organizationUserCountArray = sortObjectAndConvertToArray(organizationUserCount, 'key_export_users_with_organization', 'organization')
    const positionUserCountArray = sortObjectAndConvertToArray(positionUserCount, 'key_export_users_with_position', 'position')
    return [
        [i18next.t("key_export_age_groups")+":"],
        [getAgeGroupTitle(18), age_18],
        [getAgeGroupTitle(18, 20), age_18_20],
        [getAgeGroupTitle(21, 24), age_21_24],
        [getAgeGroupTitle(25, 39), age_25_39],
        [getAgeGroupTitle(40, 59), age_40_59],
        [getAgeGroupTitle(60, 64), age_60_64],
        [getAgeGroupTitle(null, 64), age_64],
        [i18next.t("key_export_age_not_provided"), age_not_provided],
        [],
        [i18next.t("key_export_gender")+":"],
        [i18next.t("key_export_female_count"), gender_female],
        [i18next.t("key_export_male_count"), gender_male],
        [i18next.t("key_export_gender_not_provided"), gender_not_provided],
        [],
        [i18next.t("key_export_post_code")+":"],
        
        [i18next.t("key_export_post_code_not_provided"), post_code_not_provided],
        ...postCodesArray,
        [],
        [i18next.t("key_export_city")+":"],
        ...cityUserCountArray,
        [i18next.t("key_export_city_not_provided"), city_not_provided],
        [],
        [i18next.t("key_export_organization")+":"],
        ...organizationUserCountArray,
        [i18next.t("key_export_organization_not_provided"), organization_not_provided],
        [],
        [i18next.t("key_export_position")+":"],
        ...positionUserCountArray,
        [i18next.t("key_export_position_not_provided"), position_not_provided],
        []
    ]
}

const getParticipantStatistics = (customer) => {
    const statistics = customer.statistics
    if(!statistics) return [[]]
    return [
        [i18next.t("key_export_participation")+":"],
        [i18next.t("key_export_number_of_discussions"), statistics.discussion_count],
        [i18next.t("key_export_number_of_statements"), statistics.statement_count],
        [i18next.t("key_export_number_of_arguments"), statistics.argument_count],
        [i18next.t("key_export_number_of_barometer_voting"), statistics.barometer_vote_count],
        
    ]
}
const generateAOAForStatistics = (customer) => {
    const clientInfoAOA = getClientInfoAOA(customer.public_customer_name)
    const headerAOA = getHeaderAOA()
    const totalNumberStatisticsAOA = getUserTotalNumbersAOA(customer)
    const userStatisticAOA = getUserStatisticsAOA(customer)
    const participantStatistics = getParticipantStatistics(customer)
    let data = []
    data.push(...clientInfoAOA)
    data.push(...headerAOA)
    data.push(...totalNumberStatisticsAOA)
    data.push(...userStatisticAOA)
    data.push(...participantStatistics)
    return data
}

export const exportStatisticsToExcel = (discussion, customer) => {
    const fileName = generateFileName(customer.public_customer_name);
    const wb = XLSX.utils.book_new();
    const data = generateAOAForStatistics(customer)
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, fileName);
}