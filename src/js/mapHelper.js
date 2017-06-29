// ----- Yande Map API methods ----- //

const API_ID = 6069515;
const DEFAULT_API_VERSION = '5.64';

class VkHelper {
    init(VK) {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: API_ID
            });

            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    }

    api(method, options, VK) {
        if (!options.v) {
            options.v = DEFAULT_API_VERSION;
        }

        return new Promise((resolve, reject) => {
            VK.api(method, options, data => {
                if (data.error) {
                    reject(new Error(data.error.error_msg));
                } else {
                    resolve(data.response.items);
                }
            });
        });
    }
}

module.exports = new VkHelper;