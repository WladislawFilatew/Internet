import {makeAutoObservable} from "mobx"
export default class GrafMainer{
    constructor(){
        this._profit = []
        this._expend = []
        this._time = []
        this._cost = []
        makeAutoObservable(this)
    }

    setProfit(profit){
        this._profit = profit
    }

    setExpend(expend){
        this._expend = expend
    }

    setTime(time){
        this._time = time
    }

    setCost(cost){
        this._cost = cost
    }

    get profit(){
        return this._profit
    }

    get expend(){
        return this._expend
    }
    
    get time(){
        return this._time
    }

    get cost(){
        return this._cost
    }
}