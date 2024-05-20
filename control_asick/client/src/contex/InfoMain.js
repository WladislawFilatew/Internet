import {makeAutoObservable} from "mobx"
export default class InfoMain{
    constructor(){
        this._mainers = []
        this._uslov = {}
        this._server = {}
        this._user = {}
        makeAutoObservable(this)
    }

    setMainers(mainers){
        this._mainers = mainers
    }

    setUslov(uslov){
        this._uslov = uslov
    }

    setServer(server){
        this._server = server
    }

    setUser(user){
        this._user = user
    }

    get mainers(){
        return this._mainers
    }

    get uslov(){
        return this._uslov
    }

    get server(){
        return this._server
    }

    get user(){
        return this._user
    }

    delMainer(id){
        this._mainers = this._mainers.filter(mainer => mainer.id != id)
    }

    addMainer(mainer){
        this._mainers.push(mainer)
    }

    
}