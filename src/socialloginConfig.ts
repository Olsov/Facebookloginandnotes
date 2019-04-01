import {AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';

export function getAuthServiceConfigs() {
    const configAuth = new AuthServiceConfig([{
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('{client_id}'),
        }

    ]);
    return configAuth;

}

