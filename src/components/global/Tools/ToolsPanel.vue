<template>
    <div class="toolCon">
        <div class="font-weight-bold">TOOLS</div>
        <v-divider class="my-2"/>
        
        <div class="toolContentCon grid gap-1 px-2">
            <div class="nowrap d-flex gap-1 justify-space-between">
                Replace color
                <ToolTip text="Replace ALL the color from EVERYWHERE">
                    <v-icon>mdi-help-circle</v-icon>
                </ToolTip>
                <ToolTip text="Switch">
                    <v-btn
                       @click="switchColorSwitcher"
                       color="primary"
                       size="36"
                    >
                        <v-icon size="large">mdi-swap-horizontal-bold</v-icon>
                    </v-btn>
                </ToolTip>
            </div>
            <div class="d-flex justify-space-between align-center">
                from: 
                <v-menu
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <div 
                            class="colorPreview ml-3"
                            v-bind="props"
                            :style="{ backgroundColor: `#${fromColor}` }"
                        >
                        </div>
                    </template>
                    <ColorPicker v-model="fromColor"  />
                </v-menu>  
            </div>
            <div class="d-flex justify-space-between align-center">
                to: 
                <v-menu
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <div 
                            class="colorPreview ml-3"
                            v-bind="props"
                            :style="{ backgroundColor: `#${toColor}` }"
                        >
                        </div>
                    </template>
                    <ColorPicker v-model="toColor"  />
                </v-menu>  
            </div>
            <v-btn
               @click="replaceAllColor(fromColor, toColor)"
               color="primary"
            >
               Confirm
            </v-btn>
            <v-divider />
            <div class="nowrap d-flex gap-1">
                Theme palette
                <ToolTip text="List of colors used in your theme">
                    <v-icon>mdi-help-circle</v-icon>
                </ToolTip>
            </div>
            <div class="colorPaletteGrid">
                <div v-for="(path, hex) in myColors">
                    <v-menu
                        :close-on-content-click="false"
                        open-on-hover
                    >
                        <template v-slot:activator="{ props }">
                            <div 
                                class="colorPreview ml-3"
                                :style="{ backgroundColor: `#${hex}` }"
                                v-bind="props"
                            >
                            </div>
                        </template>
                        <v-sheet class="border">
                            <div class="pa-3 text-h6 justify-center align-center">
                                <CopyBtn :text="String(hex)" icon-only size="36"/>
                                #{{ hex }}
                            </div>
                            <v-divider />
                            <v-list>
                                <v-list-item
                                    v-for="l in path"
                                    :title="l"
                                >
                                <template v-slot:prepend>
                                    <ToolTip text="Go to">
                                        <v-btn
                                            @click="goToGroup(l)"
                                            color="primary"
                                            size="36"
                                            class="mr-3"
                                        >
                                            <v-icon>mdi-arrow-right-bold-box</v-icon>
                                        </v-btn>
                                    </ToolTip>
                                </template>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-menu>  
                </div>
            </div>
            <v-divider />
            <div class="nowrap d-flex gap-1">
                Assets
                <ToolTip text="Your image assets" location="top">
                    <v-icon>mdi-help-circle</v-icon>
                </ToolTip>
            </div>
            <AssetPanel />
        </div>
    </div>
</template>
 
<script setup lang="ts">
// TODO: Split tools into smaller components
import ToolTip from "@/components/buttons/ToolTip.vue";
import ColorPicker from "@/components/global/ColorPicker.vue";
import { type Ref, ref } from "vue";
import { replaceAllColor, myColors } from "@/service/tools";
import CopyBtn from "@/components/buttons/CopyBtn.vue";
import { selectedTheme, selectedValueGroupLabel } from "@/service/theme";
import AssetPanel from "@/components/global/Tools/AssetPanel.vue";

// Replace color
const fromColor: Ref<string> = ref("F7E318");
const toColor: Ref<string> = ref("F8BBD0");
const switchColorSwitcher = () => {
    const tmp = toColor.value;
    toColor.value = fromColor.value;
    fromColor.value = tmp;
}

const goToGroup = (pathString: string) => {
    const arr = pathString.split(" - ");
    const groupLabel = arr[0];
    const childLabel = arr[1];
    const foundResult = selectedTheme.value.values.find( group => {
        // Notice that it's Case sensitive here.
        return (
            group.label.includes(groupLabel) &&
            group.child.find(gc => gc.label.includes(childLabel) )
        )
    })
    if(!foundResult) return;
    selectedValueGroupLabel.value = foundResult.label;
}
 
</script>
 
<style scoped>
.colorPaletteGrid{
    display: grid;
    grid-template-columns: repeat( auto-fit, 40px );
}
.toolCon{
    min-width: 220px
}
.toolContentCon{
    align-items: flex-start;
    align-content: start;
    height: calc(100vh - 60px - 12px - 64px);
    overflow-y: scroll;
}
</style>