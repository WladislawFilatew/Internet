import {makeAutoObservable} from "mobx"
export default class UserMainer{
    constructor(){
        this._setting = false
        makeAutoObservable(this)
    }

    setSetting(bool){
        this._setting = bool
    }

    get setting(){
        return this._setting
    }
}