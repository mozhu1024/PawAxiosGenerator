const AxiosGenerator = function() {

    var self;
    self = this;

    this.generateRequest = (request) => {
        var url = request.url.replace(/(https?:\/\/[\w\.]+)/g, "");
        var name = request.name.replace(" ", "");

        var headers = request.headers
        delete headers['Content-Type']
        var config = {
            method: request.method,
            url: url
        }
        var args = {};
        var argsBody = "";

        // FIXME: I don't know why does array error
        //     JS Exception Line (null). 
        //     TypeError: a.join is not a function. 
        //     (In 'a.join(",")', 'a.join' is undefined)
        // var args = [];
        // console.log(args)
        // console.log(args.append)
        // 
        if (Object.keys(headers).length) {
            config.headers = headers
        }

        if (request['urlQuery']) {
            config.params = request['urlParameters']
            args.params = ''
        }

        if (['PUT', 'POST', 'PATCH'].indexOf(request.method) >= 0) {
            config['data'] = request.jsonBody || request.body || {}
            if (Object.keys(config['data']).length) {
                args.data = ''
            }
        }

        if (Object.keys(args).length)
            argsBody = Object.keys(args).map(e => {
                return `,\n    ${e}:${e}`;
            }).join('');

        const doc = `/*
Name: ${name}
Description: ${request.description || 'Not write...'}
Example:
axios(${JSON.stringify(config, 2, '\t')})
*/
`
        return doc + `export const api${name} = (${Object.keys(args).join(',')}) => axios({
    method: "${request.method}",
    url: "${url}"${argsBody}
})`;
    }

    this.generate = (context, requests, options) => {
        var results;
        // self.options = (options || {}).inputs || {};
        results = requests.map((request) => {
            return self.generateRequest(request);
        });
        return results.join('\n\n');
    }
}

AxiosGenerator.identifier = "com.virzz.tools.AxiosGenerator";
AxiosGenerator.title = "Axios Code Generator";
AxiosGenerator.fileExtension = "js";
AxiosGenerator.languageHighlighter = "javascript";

registerCodeGenerator(AxiosGenerator);