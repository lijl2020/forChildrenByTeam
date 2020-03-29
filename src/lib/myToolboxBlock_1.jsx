import ScratchBlocks from 'scratch-blocks';

const categorySeparator = '<sep gap="36"/>';

const blockSeparator = '<sep gap="36"/>'; // At default scale, about 28px

const motion = function (isStage, targetId) {
    const stageSelected = ScratchBlocks.ScratchMsgs.translate(
        'MOTION_STAGE_SELECTED',
        'Stage selected: no motion blocks'
    );
    return `
    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        ${isStage ? `
        <label text="${stageSelected}"></label>
        ` : `
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        `}
    </category>
    `;
};

const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, c => {
        switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        }
    });
};



const events = function (isStage) {
    return `
    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked"/>
    </category>
    `;
};

const control = function (isStage) {
    return `
    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
        ${blockSeparator}
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};



const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {!boolean} isStage - Whether the toolbox is for a stage-type target.
 * @param {?string} targetId - The current editing target
 * @param {?Array.<object>} categoriesXML - optional array of `{id,xml}` for categories. This can include both core
 * and other extensions: core extensions will be placed in the normal Scratch order; others will go at the bottom.
 * @property {string} id - the extension / category ID.
 * @property {string} xml - the `<category>...</category>` XML for this extension / category.
 * @param {?string} costumeName - The name of the default selected costume dropdown.
 * @param {?string} backdropName - The name of the default selected backdrop dropdown.
 * @param {?string} soundName -  The name of the default selected sound dropdown.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const myToolboxBlock_1 = function (isStage, targetId, categoriesXML = [],
    costumeName = '', backdropName = '', soundName = '') {
    const gap = [categorySeparator];

    costumeName = xmlEscape(costumeName);
    backdropName = xmlEscape(backdropName);
    soundName = xmlEscape(soundName);

    categoriesXML = categoriesXML.slice();
    const moveCategory = categoryId => {
        const index = categoriesXML.findIndex(categoryInfo => categoryInfo.id === categoryId);
        if (index >= 0) {
            // remove the category from categoriesXML and return its XML
            const [categoryInfo] = categoriesXML.splice(index, 1);
            return categoryInfo.xml;
        }
        // return `undefined`
    };
    const motionXML = moveCategory('motion') || motion(isStage, targetId);
    const eventsXML = moveCategory('event') || events(isStage, targetId);
    const controlXML = moveCategory('control') || control(isStage, targetId);

    const everything = [
        xmlOpen,
        motionXML, gap,
        eventsXML, gap,
        controlXML, gap,
    ];

    for (const extensionCategory of categoriesXML) {
        everything.push(gap, extensionCategory.xml);
    }

    everything.push(xmlClose);
    // console.log("myToolboxBlock_1 return："+everything.join('\n'));
    return everything.join('\n');
};

export default myToolboxBlock_1;
