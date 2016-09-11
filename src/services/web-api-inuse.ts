/**
 * Created by Dev on 9/11/2016.
 */
export class WebApiInUseSingletonClass {

    private static _instance:WebApiInUseSingletonClass = new WebApiInUseSingletonClass();

    private _counter:number = 0;

    public isInUse:boolean = false;
    constructor() {
        if(WebApiInUseSingletonClass._instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
        WebApiInUseSingletonClass._instance = this;
    }

    public static getInstance():WebApiInUseSingletonClass
    {
        return WebApiInUseSingletonClass._instance;
    }
    public getCount():number
    {
        return this._counter;
    }

    private _calcIsInUse(){
        this.isInUse =  this._counter > 0;
    }
    public increment(value:number):void
    {
        this._counter += value;
        this._calcIsInUse();
    }

    public decrement(value:number):void
    {
        this._counter -= value;
        this._calcIsInUse();
    }
}