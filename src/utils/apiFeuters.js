import { paginationFunction } from "./pagination.js"

export class ApiFeuters{
    constructor (mongooseQuery,queryData){
        this.mongooseQuery=mongooseQuery
        this.queryData=queryData
    }
    // pagination
    pagination(){
        const {page,size} = this.queryData
        const {limit,skip} = paginationFunction({page,size})
        this.mongooseQuery.limit(limit).skip(skip)
        return this
    }
    // sort
    sort(){
        this.mongooseQuery.sort(this.queryData.sort?.replaceAll(',',','))
        return this
    }
    // select
    select(){
        this.mongooseQuery.select(this.queryData.select?.replaceAll(',',','))
        return this
    }
    //filters
    filters(){
        const queryinstence = {...this.queryData}
        const excludeKeyArr = ['page','size','sort','select','search']
        excludeKeyArr.forEach((key)=> delete queryinstence[key])
        const queryString = JSON.parse(JSON.stringify(queryinstence).replace(/gt|gte|lt|lte|in|nin|eq|neq|regex/g,(match)=>'$${match'),)
        this.mongooseQuery.find(queryString) 
        return this
    }
}