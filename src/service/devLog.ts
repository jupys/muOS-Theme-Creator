type DevLog = {
    date: string,
    version: string,
    text: string // html works
}
export const devLog: DevLog[] = [
    {
        date: "2024-4-01",
        version: "v0.9999",
        text: `
            <h3>Finally, we are soo close to a full release !</h3>
            <h4>Changes</h4>
			- Load theme (scheme or zip). <br>
			- Full muOS v11 support. <br>
            - Depreciated v10 support. <br>
            - Music. <br>
            - Sound. <br>
            - Font. <br>
            - QoL Changes. <br>
        `
    },
	{
        date: "2024-03-30",
        version: "v0.64",
        text: `
            <h4>Changes</h4>
			- Fixed breaking changes that cause selecting turning into rainbow screen. <br>
			- Migrating stuff to support muOS v11, at this point, v10 should still be compatible at this stage. <br>
        `
    },
	{
        date: "2024-03-29",
        version: "v0.63",
        text: `
            <h4>Changes</h4>
            - Merged all the image editing tools into one -> Image editor. <br>
			- QoL changes <br>
        `
    },
    {
        date: "2024-03-28",
        version: "v0.64",
        text: `
            <h4>Changes</h4>
            - Reworked the entire Scree preview component easier to add and <br>
              manipulate. Easier for contributor to edit. <br>
            - Added Image Resizer.<br>
            - Image Cropper in dev mode.<br>
        `
    },
    {
        date: "2024-03-27",
        version: "v0.5",
        text: `
            <h4>Changes</h4>
            - Implemented most of the basic logic, just need to build things up from now on.
            <br>
            <h4>Still not working (Could've focus on this instead LOL)</h4>
            - Load theme <br>
            - Any Sound related <br>
            - Any Font related <br>
        `
    },
    {
        date: "2024-03-26",
        version: "v0.4",
        text: `
            <h4>Changes</h4>
            - Added some QoL functions <br>
            - Added the preview panel <br>
            - Image related should work now <br>
            <br>
            <h4>Still not working</h4>
            - Load theme <br>
            - Any Sound related <br>
            - Any Font related <br>
        `
    },
    {
        date: "2024-03-25",
        version: "v0.2",
        text: `
            What is not working now: <br>
            - Load theme <br>
            - any images related <br>
            - any sound related <br>
        `
    },
    {
        date: "2024-03-25",
        version: "v0.1",
        text: `(｡・ω・｡)`
    }
]