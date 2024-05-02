import SinMH from './templates/SinMH.mjs';

export default class ManHuaGuiTw extends SinMH {

    constructor() {
        super();
        super.id = 'manhuaguitw';
        super.label = '看漫画 (ManHuaGuiTw)';
        this.tags = [ 'webtoon', 'chinese' ];
        this.url = 'https://tw.manhuagui.com/user/book/shelf';
        this.requestOptions.headers.set('x-referer', this.url);
        this.requestOptions.headers.set('x-cookie', 'isAdult=1; country=HX; ASP.NET_SessionId=0wwkjksube0qf5qu1xurtoki; cookie_url_referrer=https%3a%2f%2ftw.manhuagui.com%2fuser%2fbook%2fshelf; my=%e5%90%8e%e5%ae%ab%e5%8a%a8%e6%bc%ab%7c5D1293F7FCB9AC98C17C5AFC5F40DB4A; adult=i0y7lCD8Fqg_FBNDOPAaKw')
        this.requestOptions.headers.set('x-authority', 'tw.manhuagui.com');
        this.requestOptions.headers.set('Dnt', '1');
        this.requestOptions.headers.set('x-cache-control', 'max-age=0');
        this.requestOptions.headers.set('x-sec-ch-ua-mobile', '?0');
        this.requestOptions.headers.set('x-sec-ch-ua-platform', 'Windows');
        this.requestOptions.headers.set('x-user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
        this.requestOptions.headers.set('x-sec-ch-ua', '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"');
        this.requestOptions.headers.set('accept-language', 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,ja-JP;q=0.6,ja;q=0.5,zh-CN;q=0.4');
        this.requestOptions.headers.set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7');

        this.api = 'SMH';
        //this.path = '/list/index_p%PAGE%.html';
        //this.queryMangasPageCount = 'div.pager a:last-of-type';
        this.queryChapters = 'div.chapter-list ul li a';
        this.config = {
            throttle: {
                label: 'Page Throttle Requests [ms]',
                description: 'Enter the timespan in [ms] to delay consecuitive HTTP requests while downloading Pages.\nThe website may ban your IP for to many consecuitive requests.',
                input: 'numeric',
                min: 500,
                max: 10000,
                value: 2500
            }
        };
        this.queryPagesScript =`
            new Promise(resolve => {
                ${this.api}.imgData = function(data) {
                    let origin = pVars.manga.filePath;
                    let pageLinks = data.files.map(file => origin + file + '?e=' + data.sl.e + '&m=' + data.sl.m);
                    return {
                        preInit: () => resolve(pageLinks)
                    };
                };
                let script = [...document.querySelectorAll('script:not([src])')].find(script => script.text.trim().startsWith('window[')).text;
                eval(script);
            } );
        `;
    }

    canHandleURI(uri) {
        return /https?:\/\/(?:tw\.)?(mhgui|manhuagui).com/.test(uri.origin);
    }

    async _getMangas() {
        let msg = 'This function was disabled to prevent of being IP banned by the website owner, please copy and paste the URL containing the chapters directly from your browser into HakuNeko.';
        throw new Error(msg);
    }
}