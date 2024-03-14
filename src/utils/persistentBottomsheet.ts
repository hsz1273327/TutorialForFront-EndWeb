let installed = false;
const PBSPlugin = {
    install(app) {
        if (!installed) {
            installed = true;
            app.registerElement('BottomSheet', () => require('@nativescript-community/ui-persistent-bottomsheet').PersistentBottomSheet, {
                model: {
                    prop: 'stepIndex',
                    event: 'stepIndexChange',
                },
            });
        }
        
    },
};

export default PBSPlugin;