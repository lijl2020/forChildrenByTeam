global.constants = {
    currentGate:'gate1',
    checkPointNum:0,
};

global.gateConfig = {
    gate1 : {
        sb3Url:'/static/Scratch1.sb3',
        scratchBlockToolbox:'../lib/myToolboxBlock_1.jsx',
        gateExtenseBlock:'forChildren',
        midCheckPointNum:0,
        checkPointList:[
            {
                leftTop:{x:50, y:97},
                rightTop:{x:94, y:97},
                rightBottom:{x:94, y:53},
                leftBottom:{x:50, y:53}
            }
        ]
    },
    gate2 : {
        sb3Url:'/static/Scratch2.sb3',
        scratchBlockToolbox:'../lib/myToolboxBlock_1.jsx',
        gateExtenseBlock:'forChildren',
        midCheckPointNum:1,
        checkPointList:[
            {
                leftTop:{x:53, y:-7},
                rightTop:{x:91, y:-7},
                rightBottom:{x:91, y:-43},
                leftBottom:{x:53, y:-43}
            },
            {
                leftTop:{x:50, y:97},
                rightTop:{x:94, y:97},
                rightBottom:{x:94, y:53},
                leftBottom:{x:50, y:53}
            }
        ]
    }
};

    const getCheckPointNum = () => {
        return global.constants.checkPointNum;
    }

    const getCurrentGate = () => {
        return global.constants.currentGate;
    }

    const  getCurrentGateConfig = () => {
        const currentGate = getCurrentGate();
        return global.gateConfig[currentGate];
    }

    const getCheckPointList = () => {
        const currentGateConfig = getCurrentGateConfig();
        return currentGateConfig.checkPointList;
    }
    
    const getCurrentGateConfigProp = (prop) => {
        const currentGateConfig = getCurrentGateConfig();
        return currentGateConfig[prop];
    }

    const arrivedCheckPoint = () => {
        global.constants.checkPointNum--;
    }
    
    const resetCheckPointNum = () => {
        const currentGateConfig = getCurrentGateConfig();
        global.constants.checkPointNum = currentGateConfig['midCheckPointNum'];
    }

    const checkIsArrivedPoint = (target) => {
        if (!target) {
            return false;
        }
        const midCheckPointNum = getCheckPointNum();
        const checkPointList = getCheckPointList();
        if (midCheckPointNum > 0 && checkPointList.length >= midCheckPointNum+1){
            const targetX = target.x;
            const targetY = target.y;

            const midCheckPoint = checkPointList[midCheckPointNum - 1];
            console.log(`当前坐标：x:${targetX},y:${targetY}.判断是否到达${midCheckPoint}`);
            // 判断坐标是否是在中间的第N个目的地
            if( checkTargetAtDest(target, midCheckPoint)){
                // global.constants.checkPointNum--;
                arrivedCheckPoint();
                return true;
            }
            
        }

        return false;
    }

    const checkIsArrivedEnd = (target) => {
        const checkPointList = getCheckPointList();
        // 已经在加载关卡时判断了目的地数量和坐标配置的正确性，
        // 所以直接取最后一个坐标作为终点判断
        const endPoint = checkPointList[checkPointList.length - 1];

        if(checkTargetAtDest(target, endPoint)){
            return true;
        }

        return false;
    }

    const checkTargetAtDest = (target, destPoint) => {
        if (!target) {
            return false;
        }
        // 判断坐标是否是在中间的第N个目的地
        const targetX = target.x;
        const targetY = target.y;
        if ((targetX >= destPoint.leftTop.x && targetY <= destPoint.leftTop.y)
            && (targetX <= destPoint.rightTop.x && targetY <= destPoint.rightTop.y)
            && (targetX <= destPoint.rightBottom.x && targetY >= destPoint.rightBottom.y)
            &&(targetX >= destPoint.leftBottom.x && targetY >= destPoint.leftBottom.y)
           ){
            // global.constants.checkPointNum--;
            // arrivedCheckPoint();
            return true;
        }
        return false;
    }


    export {
        getCheckPointNum,
        getCurrentGate,
        getCurrentGateConfig,
        getCheckPointList,
        getCurrentGateConfigProp,
        arrivedCheckPoint,
        resetCheckPointNum,
        checkIsArrivedPoint,
        checkIsArrivedEnd
    };
// global.constants={
//     currentGate:'gate1',
//     checkPointNum:0,
// }

// global.isLoadSb3=false;

// global.gateConfg={
//     gate1:{
//         sb3Url:'/static/Scratch1.sb3',
//         scratchBlockToolbox:'../lib/myToolboxBlock_1.jsx',
//         gateExtenseBlock:'forChildren',
//         midCheckPointNum:0,
//         checkPointList:[
//             {
//                 leftTop:{x:50, y:97},
//                 rightTop:{x:94, y:97},
//                 rightBottom:{x:94, y:53},
//                 leftBottom:{x:50, y:53}
//             }
//         ]
//     },
//     gate2:{
//         sb3Url:'/static/Scratch2.sb3',
//         scratchBlockToolbox:'../lib/myToolboxBlock_1.jsx',
//         gateExtenseBlock:'forChildren',
//         midCheckPointNum:1,
//         checkPointList:[
//             {
//                 leftTop:{x:53, y:-7},
//                 rightTop:{x:91, y:-7},
//                 rightBottom:{x:91, y:-43},
//                 leftBottom:{x:53, y:-43}
//             },
//             {
//                 leftTop:{x:50, y:97},
//                 rightTop:{x:94, y:97},
//                 rightBottom:{x:94, y:53},
//                 leftBottom:{x:50, y:53}
//             }
//         ]
//     }
// }


