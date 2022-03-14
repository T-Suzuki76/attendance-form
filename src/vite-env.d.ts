/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APIKEY : string|undefined;
    readonly VITE_AUTHDOMAIN : string|undefined;
    readonly VITE_PROJECTID : string|undefined;
    readonly VITE_STORAGEBUCKET : string|undefined;
    readonly VITE_MESSAGINGSENDERID : string|undefined;
    readonly VITE_APPID : string|undefined;
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}