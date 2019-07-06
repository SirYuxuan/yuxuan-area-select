class YxAreaSelect {
    /**
     * 构造函数,创建select
     * @param {启动参数} option 
     */
    constructor(option){
        if (typeof option == 'undefined') {
            throw 'YxAreaSelect Setting Is Not Found';
        }
        if (typeof option != 'object') {
            throw 'YxAreaSelect Setting Is Not Object';
        }
        this.settingConfig(option);
        document.querySelector(this.setting.elem).innerHTML = this.createSelectBody();
        let provinceDom = document.querySelector('.yx-area-select-province');
        let cityDom = document.querySelector('.yx-area-select-city');
        let areaDom = document.querySelector('.yx-area-select-area');
        this.provinceDom = provinceDom;
        this.cityDom = cityDom;
        this.areaDom = areaDom;
        //省被选择,重画市和区的内容
        provinceDom.addEventListener('change',()=>{
            cityDom.innerHTML = this.createBody(this.getDomCode(provinceDom));
            areaDom.innerHTML = this.createBody(this.getDomCode(cityDom));
        });
        cityDom.addEventListener('change',()=>{
            areaDom.innerHTML = this.createBody(this.getDomCode(cityDom));
        });
        //处理默认值,
        if(this.setting.defProvince.length > 0){

        }
     
    }
    /**
     * 获取dom的code值
     */
    getDomCode(dom){
        let index = dom.selectedIndex;
        let code = dom.options[index].getAttribute('data-code');
        return code;
    }
     /**
     * value
     */
    getDomValue(dom){
        let index = dom.selectedIndex;
        let code = dom.options[index].getAttribute('data-value');
        return code;
    }
    /**
     * 根据编码创建option
     * @param {省份编码} code 
     */
    createBody(code){
        let jsonData = AREADATA[code];
        let html = `<option>${this.setting.defChoose}</option>`;
        for (const key in jsonData) {
            html += `<option data-code='${key}' data-value='${jsonData[key]}'>${jsonData[key]}</option>`;
        }
        return html;
    }


    /**
     * 处理配置项,给配置项处理默认值
     * @param {*} option 
     */
    settingConfig(option) {
        this.setting = option;
        //mode 模式 取值 value,code
        this.setting.mode = option.mode || 'value';
        this.setting.defProvince = option.defProvince || '';
        this.setting.defCity = option.defCity || '';
        this.setting.defArea = option.defArea || ''
        this.setting.defChoose = option.defChoose || '请选择';
    }
    getProvince(){
        return this.setting.mode == 'value' ? this.getDomValue(this.provinceDom):this.getDomCode(this.provinceDom);
    }
    getCity(){
        return this.setting.mode == 'value' ? this.getDomValue(this.cityDom):this.getDomCode(this.cityDom);
    }
    getArea(){
        return this.setting.mode == 'value' ? this.getDomValue(this.areaDom):this.getDomCode(this.areaDom); 
    }
    /**
     * 创建选择框html
     */
    createSelectBody(){
        let html = '';
        let province = `<select class='yx-area-select-province'><option>${this.setting.defChoose}</option>`;
        let data = AREADATA[100000];
        let defProvinceCode;
        let defCityCode;
        let defAreaCode;
        for (const key in data) {
            let selected = '';
            if(this.setting.defProvince.length > 0){
                if(this.setting.mode === 'value' && this.setting.defProvince == data[key]){
                    selected = 'selected';
                    defProvinceCode = key;
                }else if(this.setting.defProvince == key){
                    selected = 'selected';
                    defProvinceCode = key;
                }
            }
           province += `<option data-code='${key}' ${selected} data-value='${data[key]}'>${data[key]}</option>`;
        }
        province += '</select>';
        let city;
        if(defProvinceCode != undefined){
            data = AREADATA[defProvinceCode];
            city = `<select class='yx-area-select-city'><option>${this.setting.defChoose}</option>`;
            for (const key in data) {
                let selected = '';
                if(this.setting.defCity.length > 0){
                    if(this.setting.mode === 'value' && this.setting.defCity == data[key]){
                        selected = 'selected';
                        defCityCode = key;
                    }else if(this.setting.defCity == key){
                        selected = 'selected';
                        defCityCode = key;
                    }
                }
                city += `<option data-code='${key}' ${selected} data-value='${data[key]}'>${data[key]}</option>`;
            }
            city += '</select>';
        }else{
            city = `<select class='yx-area-select-city'><option>${this.setting.defChoose}</option></select>`;
        }

        let area;
        if(defCityCode != undefined){
            data = AREADATA[defCityCode];
            area = `<select class='yx-area-select-area'><option>${this.setting.defChoose}</option>`;
            for (const key in data) {
                let selected = '';
                if(this.setting.defArea.length > 0){
                    if(this.setting.mode === 'value' && this.setting.defArea == data[key]){
                        selected = 'selected';
                    }else if(this.setting.defArea == key){
                        selected = 'selected';
                    }
                }
                area += `<option data-code='${key}' ${selected} data-value='${data[key]}'>${data[key]}</option>`;
            }
            area += '</select>';
        }else{
            area = `<select class='yx-area-select-city'><option>${this.setting.defChoose}</option></select>`;
        }
        html+=province+city+area;
        return html; 
    }
}