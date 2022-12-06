import * as XLSX from 'xlsx';
import moment from 'moment';
import i18next from 'i18next';
import { UseWording, UseNotifyWording } from '../utils';
import {
    STATEMENT_STATUS_ACTIVE, STATEMENT_STATUS_HIDDEN, ARGUMENT_STATUS_ACTIVE, ARGUMENT_STATUS_HIDDEN,
  } from '../constants';
const generateFileName = (title) => {
    let currentDate = moment().format('YYYY-MM-DD-hhmmss')
    let name = title.replaceAll(" ", "_")
    return currentDate + '_brabbl-data-export_'+name+".xlsx";
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
        [i18next.t("key_export_column_type"),
         i18next.t("key_export_column_title"),
         i18next.t("key_export_column_statement_title"),
         i18next.t("key_export_column_argument_title"),
         i18next.t("key_export_column_description"),
         i18next.t("key_export_column_date_and_time_created"),
         i18next.t("key_export_column_start_time"),
         i18next.t("key_export_column_end_time"),
         i18next.t("key_export_column_creator_name"),
         i18next.t("key_export_column_average_rating"),
         i18next.t("key_export_column_total_number_of_votes"),
         i18next.t("key_export_column_wording_for_plus_3_rating"),
         i18next.t("key_export_column_number_of_votes_for_plus_3_rating"),
         i18next.t("key_export_column_wording_for_plus_2_rating"),
         i18next.t("key_export_column_number_of_votes_for_plus_2_rating"),
         i18next.t("key_export_column_wording_for_plus_1_rating"),
         i18next.t("key_export_column_number_of_votes_for_plus_1_rating"),
         i18next.t("key_export_column_wording_for_0_rating"),
         i18next.t("key_export_column_number_of_votes_for_0_rating"),
         i18next.t("key_export_column_wording_for_minus_1_rating"),
         i18next.t("key_export_column_wording_for_minus_2_rating"),
         i18next.t("key_export_column_number_of_votes_for_minus_2_rating"),
         i18next.t("key_export_column_wording_for_minus_3_rating"),
         i18next.t("key_export_column_number_of_votes_for_minus_3_rating"),
        ]
    ]
}

const getDiscussionAOA = (discussion, customer) => {

    let type = i18next.t('key_discussion-modal_discussion-type-section_pro-contra-discussion-name')
    if(discussion.multiple_statements_allowed) {
        type = i18next.t('Survey')
    }
    let name = discussion.author.display_name
    let data =  [
        [
            type,
            discussion.statement,
            "",
            "",
            discussion.description,
            moment(discussion.created_at).format('MM.DD.YYYY, hh:mm'),
            moment(discussion.start_time).format('MM.DD.YYYY, hh:mm'),
            discussion.end_time ? moment(discussion.end_time).format('MM.DD.YYYY, hh:mm') : i18next.t('Active Forever'),
            name,
        ]
    ]
    if(discussion.statements) {
        discussion.statements.forEach(statement => {
            data.push(...getStatementAOA(statement, discussion, customer))
        })
    }
    return data
}
const buildWordingDict = (wording) => {
    let wordingDict = {};
    if (wording) {
      for (let i = 0; i < wording.length; ++i) {
        if (typeof wording[i] !== 'undefined') {
          wordingDict[wording[i].value] = wording[i].name;
        }
      }
    }
    return wordingDict;
}
const getRatingPercentage = (total, count) => {
    if(total == 0) return "0 (0%)"
    let percentage = Math.floor((count / total) * 100) + "%"
    return count + " ("+percentage+")"
}

const getArgumentAOA = (argument, discussion, customer) => {
    let type = argument.is_pro ? UseWording({discussion, customer}, 'header_pro') : UseWording({discussion, customer}, 'header_contra')
    let name = argument.author.display_name
    let title = argument.title
    let description = argument.text
    if(argument.status === STATEMENT_STATUS_HIDDEN) {
        title = UseNotifyWording({customer}, 'hidden_posting_title') + "[" + title + "]"
        description = UseNotifyWording({customer}, 'hidden_posting_title') + "[" + description + "]"
    }
    let data = [
        type,
        "",
        "",
        title,
        description,
        moment(argument.created_at).format('MM.DD.YYYY, hh:mm'),
        "",
        "",
        name,
        argument.rating.rating,
        argument.rating.count

    ]
    return data
}

const getStatementAOA = (statement, discussion, customer) => {
    let type = UseWording({discussion, customer}, 'survey_statement')
    let name = statement.author.display_name
    let wordingDict = buildWordingDict(statement.barometer.wording)
    let title = statement.statement
    let description = statement.description
    if(statement.status === STATEMENT_STATUS_HIDDEN) {
        title = UseNotifyWording({customer}, 'hidden_posting_title') + "[" + title + "]"
        description = UseNotifyWording({customer}, 'hidden_posting_title') + "[" + description + "]"
    }
    let data = [[
        type,
        "",
        title,
        "",
        description,
        moment(statement.created_at).format('MM.DD.YYYY, hh:mm'),
        "",
        "",
        name,
        statement.barometer.rating,
        statement.barometer.count,
        wordingDict[3],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["3"]),
        wordingDict[2],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["2"]),
        wordingDict[1],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["1"]),
        wordingDict[0],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["0"]),
        wordingDict[-1],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["-1"]),
        wordingDict[-2],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["-2"]),
        wordingDict[-3],
        getRatingPercentage(statement.barometer.count, statement.barometer.count_ratings["-3"]),
    ]]
    if(statement.arguments) {
        statement.arguments.forEach(argument => {
            data.push(getArgumentAOA(argument, discussion, customer))
        })
    }
    return data;
}


const generateAOAForDiscussion = (discussion, customer) => {
    const clientInfoAOA = getClientInfoAOA(customer.public_customer_name)
    const headerAOA = getHeaderAOA()
    const discussionAOA = getDiscussionAOA(discussion, customer)
    let data = []
    data.push(...clientInfoAOA)
    data.push(...headerAOA)
    data.push(...discussionAOA)
    return data
}
export const exportDiscussionToExcel = (discussion, customer) => {
    const fileName = generateFileName(discussion.statement);
    const wb = XLSX.utils.book_new();
    const data = generateAOAForDiscussion(discussion, customer)
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, fileName);
}