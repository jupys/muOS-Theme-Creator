/**
 * Asset manager
 */
import { type Ref, ref } from "vue";
import axios from 'axios';
import { type MUOSThemeChild } from "@/service/theme";
import { Generate } from "cerceis-lib";

const defaultAssetData = [
    { filename: "bootlogo", path: new URL('@/assets/images/defaultImages/bootlogo.bmp', import.meta.url), type: "image/bmp" },
    { filename: "default-wallpaper", path: new URL('@/assets/images/defaultImages/wall/default.png', import.meta.url), type: "image/png" },
    { filename: "default-muxcharge", path: new URL('@/assets/images/defaultImages/wall/muxcharge.png', import.meta.url), type: "image/png" },
    { filename: "default-muxstart", path: new URL('@/assets/images/defaultImages/wall/muxstart.png', import.meta.url), type: "image/png" },
    // Fonts
    { filename: "Comicsans", path: new URL('@/assets/images/defaultImages/font/comicsans.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Helvetica", path: new URL('@/assets/images/defaultImages/font/helvetica.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "OpenDyslexicNerdFont-Regular", path: new URL('@/assets/images/defaultImages/font/OpenDyslexicNerdFont-Regular.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Papyrus", path: new URL('@/assets/images/defaultImages/font/Papyrus.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "ProductSans-Regular", path: new URL('@/assets/images/defaultImages/font/ProductSans-Regular.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "Roboto-Light", path: new URL('@/assets/images/defaultImages/font/Roboto-Light.bin', import.meta.url), type: "application/octet-stream" },
    { filename: "SpaceMonoNerdFont-Regular", path: new URL('@/assets/images/defaultImages/font/SpaceMonoNerdFont-Regular.bin', import.meta.url), type: "application/octet-stream" },
]

export type Asset = {
    id: string,
    filename: string,
    base64: string,
    bin: File | Blob | null,
    type: string,
    format: string,
}
export const assets: Ref<Asset[]> = ref([])
export const assetFunc = {
    _selectedAsset: null as null | Asset,
    async add(f: File){
        const nameArr = f.name.split(".")
        nameArr.pop();
        const filename = nameArr.join(""); 
        assets.value.unshift({
            id: Generate.objectId(),
            filename: filename,
            base64: await fileToBase64(f), 
			bin: f.type.includes("font") ? f : null, 
            type: f.type,
            format: f.type.split("/")[1]
        } as Asset)
    },
	async addBase64(base64: string, name: string, type: string){
        const nameArr = name.split(".")
        nameArr.pop();
        const filename = nameArr.join(""); 
        assets.value.unshift({
            id: Generate.objectId(),
            filename: filename,
            base64: base64, bin: null, 
            type: type,
            format: type.split("/")[1]
        })
    },
	delete(a: Asset){
		for(let i = 0; i < assets.value.length; i++){
			if(assets.value[i].id === a.id){
				assets.value.splice(i, 1);
				return;
			}
		}
	},
	getByID(id: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].id === id){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    getByFilename(filename: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].filename === filename){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    getByValue(base64: string){
        for(let i = 0; i < assets.value.length; i++){
            if(assets.value[i].base64 === base64){
                this._selectedAsset = assets.value[i];
                break;
            }
        }
        return this;
    },
    asB64(){ return this._selectedAsset; },
    asFile(){
        if(!this._selectedAsset){
            return new File([new Blob([], { type: "text/plain" })], "error", {type: "text/plain"});
        }
        return base64ToFile(
            this._selectedAsset.base64.split(",")[1],
            `${this._selectedAsset.filename}.${this._selectedAsset.format}`,
            this._selectedAsset.type
        )
    }
}

export const downloadAndConvertToBase64 = async(url: any, type: string): Promise<string> => {
    try {
        // Make HTTP GET request to download the file
        const response = await axios.get(url, {
            responseType: 'arraybuffer', // Ensure response data is treated as binary data
        });
        const blob = new Blob([response.data], {type});
        const base64String = fileToBase64(blob);
        return base64String;
    } catch (error) {
        console.error('Error downloading or converting file:', error);
        throw error;
    }
}

export const loadDefaultAssets = async() => {
    for(let i = 0; i < defaultAssetData.length; i++) {
        const rs = await downloadAndConvertToBase64(defaultAssetData[i].path, defaultAssetData[i].type);
        assets.value.push({
            id: Generate.objectId(),
            filename: defaultAssetData[i].filename,
            base64: rs, bin: null, 
            type: defaultAssetData[i].type,
            format: defaultAssetData[i].type.split("/")[1]
        })
    }
}

export const fileToBase64 = (file: File | Blob): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		if(!file) return resolve("");
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64String = reader.result as string;
			return resolve(base64String);
		};
	})
}
/**
 * 
 * @param base64 Without the datatype !
 * @returns 
 */
export const base64ToFile = (base64: string, filename: string, mimetype: string): File => {
    // Decode the base64 string to binary data
    const binaryString = atob(base64);
    // Convert the binary string to a Uint8Array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    // Create a Blob object from the Uint8Array
    const blob = new Blob([byteArray], { type: mimetype });
    // Create a File object from the Blob
    return new File([blob], filename, { type: mimetype });
}

export type AssetSelector = {
    id: string,
    show: boolean,
    target: string, // target child id
}
export const assetSelectorList: Ref<AssetSelector[]> = ref([])
export const assetSelector = {
    new(childId: string){
        assetSelectorList.value.push({
            id: Generate.objectId(),
            show: true,
            target: childId,
        })
    },
    destroy(selector: AssetSelector){
        for(let i = 0; i < assetSelectorList.value.length; i++){
            if(assetSelectorList.value[i].id === selector.id){
                assetSelectorList.value.splice(i,1);
                return;
            }
        }
    }
}