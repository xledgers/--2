input.onGesture(Gesture.ScreenDown, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # . #
        . . . . .
        . . . . .
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    music.playTone(587, music.beat(BeatFraction.Double))
    mbit_Car.RGB_Car_Big(R, G, B)
})
input.onGesture(Gesture.TiltLeft, function () {
    basic.showLeds(`
        # . . . .
        . # . . .
        . . # . .
        . . . . .
        . . . . #
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    music.playTone(262, music.beat(BeatFraction.Double))
    mbit_Car.RGB_Car_Big(R, G, B)
})
function blacklineTracking () {
    if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.Black) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.Black)) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 60)
    } else if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.White) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.Black)) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinRight, 80)
    } else if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.Black) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.White)) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinLeft, 80)
    } else {
        mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    }
}
function moveRight () {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Right, 60)
}
function resetVars () {
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
        `)
    laststripe = 0
    curentstripe = 0
    lighton = -1
    yellowseconds = 0
    greenseconds = 0
    lovemode = 0
    U_distance = 0
    U_now = 0
    U_ago = 0
    avoidmode = -1
    trackmode = 0
    direct = 0
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
}
function moveForward () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 60)
}
function turnLeft () {
    basic.showLeds(`
        . . # # #
        . . # # .
        . . # . #
        . . . . #
        # # # # .
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinLeft, 60)
}
Mbit_IR.onPressEvent(RemoteButton.Power, function () {
    resetVars()
})
Mbit_IR.onPressEvent(RemoteButton.TRight, function () {
    turnRight()
})
Mbit_IR.onPressEvent(RemoteButton.Right, function () {
    moveRight()
})
function lightcontrol () {
    lighton = lighton * -1
    if (lighton == 1) {
        mbit_Car.RGB_Car_Big(R, G, B)
    } else {
        mbit_Car.RGB_Car_Big(0, 0, 0)
    }
}
Mbit_IR.onPressEvent(RemoteButton.NUM0, function () {
    requestLoveMode()
})
Mbit_IR.onPressEvent(RemoteButton.Up, function () {
    moveForward()
})
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Run)
})
function AvoidMode () {
    U_ago = mbit_Car.Ultrasonic_Car()
    U_now = mbit_Car.Ultrasonic_Car()
    if (U_ago - U_now <= 10 && U_ago - U_now >= 0 || U_now - U_ago <= 10 && U_now - U_ago >= 0) {
        U_distance = Math.idiv(U_ago + U_now, 2)
        if (U_distance < 15 && U_distance >= 2) {
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinLeft, 60)
            basic.pause(300)
        } else {
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 80)
        }
    }
}
function MoveWithAvoid () {
    U_ago = mbit_Car.Ultrasonic_Car()
    U_now = mbit_Car.Ultrasonic_Car()
    if (U_ago - U_now <= 10 && U_ago - U_now >= 0 || U_now - U_ago <= 10 && U_now - U_ago >= 0) {
        U_distance = Math.idiv(U_ago + U_now, 2)
        if (U_distance < 15 && U_distance >= 2) {
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinLeft, 60)
            basic.pause(300)
        } else {
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 80)
        }
    }
}
Mbit_IR.onPressEvent(RemoteButton.Light, function () {
    lightcontrol()
})
function requestLoveMode () {
    basic.showLeds(`
        # # # # #
        . . . . .
        # # # # #
        . . . . .
        # # # # #
        `)
    yellowseconds = 0
    greenseconds = 0
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    radio.sendValue("requestg", 10)
}
Mbit_IR.onPressEvent(RemoteButton.Left, function () {
    moveLeft()
})
Mbit_IR.onPressEvent(RemoteButton.Down, function () {
    moveBackward()
})
input.onButtonPressed(Button.AB, function () {
    resetVars()
})
Mbit_IR.onPressEvent(RemoteButton.TLeft, function () {
    turnLeft()
})
function turnRight () {
    basic.showLeds(`
        # # # . .
        . # # . .
        # . # . .
        # . . . .
        . # # # #
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_SpinRight, 60)
}
input.onGesture(Gesture.FreeFall, function () {
    basic.showLeds(`
        # . # . #
        # . # . #
        # . # . #
        # . # . #
        # . # . #
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    music.playTone(988, music.beat(BeatFraction.Double))
    mbit_Car.RGB_Car_Big(255, 0, 0)
})
Mbit_IR.onPressEvent(RemoteButton.NUM3, function () {
    B = B + pace
    if (B > 255) {
        B = B - 255
    }
    mbit_Car.RGB_Car_Big(R, G, B)
})
Mbit_IR.onPressEvent(RemoteButton.NUM5, function () {
    trackmode = 1
})
Mbit_IR.onPressEvent(RemoteButton.NUM2, function () {
    G = G + pace
    if (G > 255) {
        G = G - 255
    }
    mbit_Car.RGB_Car_Big(R, G, B)
})
Mbit_IR.onPressEvent(RemoteButton.NUM1, function () {
    R = R + pace
    if (R > 255) {
        R = R - 255
    }
    mbit_Car.RGB_Car_Big(R, G, B)
})
radio.onReceivedValue(function (name, value) {
    if (name == "yellows") {
        for (let index = 0; index < value; index++) {
            basic.showString("Y")
            basic.pause(1000)
            yellowseconds += -1
        }
    } else if (name == "greens") {
        lovemode = 1
        greenseconds = value
        for (let index = 0; index < value; index++) {
            basic.pause(1000)
            greenseconds += -1
        }
    }
    if (name == "direct") {
        if (value == 1) {
            moveForward()
        } else if (value == 2) {
            moveBackward()
        } else if (value == 3) {
            moveLeft()
        } else if (value == 4) {
            moveRight()
        } else if (value == 5) {
            turnLeft()
        } else if (value == 6) {
            turnRight()
        } else if (value == 7) {
            turnLeft()
        } else if (value == 8) {
            turnRight()
        } else if (value == 11) {
            requestLoveMode()
        } else {
            mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
        }
    }
    if (name == "light") {
        if (value == 1) {
            R = 255
            G = 255
            B = 255
            lightcontrol()
        }
    }
    if (name == "move") {
        if (value == 1) {
            trackmode = 1
        } else if (value == 3) {
            avoidmode = 1
        }
    }
})
Mbit_IR.onPressEvent(RemoteButton.NUM6, function () {
    trackmode = 2
})
function zebraTracking () {
    laststripe = curentstripe
    if (laststripe == 0) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 60)
    }
    if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.Black) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.Black)) {
        basic.showNumber(2)
        if (laststripe == 1) {
            curentstripe = -1
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 60)
        } else {
            mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
        }
    } else if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.White) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.White)) {
        basic.showNumber(1)
        if (laststripe == -1) {
            curentstripe = 1
            mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 60)
        } else {
            mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
        }
    } else if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.Black) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.White)) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Left, 60)
    } else if (mbit_Car.Line_Sensor(mbit_Car.enPos.LeftState, mbit_Car.enLineState.White) && mbit_Car.Line_Sensor(mbit_Car.enPos.RightState, mbit_Car.enLineState.Black)) {
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Right, 60)
    }
}
input.onGesture(Gesture.TiltRight, function () {
    basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . . . . .
        # . . . .
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    music.playTone(262, music.beat(BeatFraction.Double))
    mbit_Car.RGB_Car_Big(R, G, B)
})
function moveBackward () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Back, 60)
}
function moveLeft () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Left, 60)
}
Mbit_IR.onPressEvent(RemoteButton.NUM4, function () {
    avoidmode = avoidmode * -1
})
input.onGesture(Gesture.ScreenUp, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        # . # # #
        . . . . .
        . . . . .
        `)
    mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
    mbit_Car.RGB_Car_Big(R, G, B)
    music.playTone(587, music.beat(BeatFraction.Double))
})
let direct = 0
let trackmode = 0
let avoidmode = 0
let U_ago = 0
let U_now = 0
let U_distance = 0
let lovemode = 0
let greenseconds = 0
let yellowseconds = 0
let lighton = 0
let curentstripe = 0
let laststripe = 0
let R = 0
let G = 0
let B = 0
let pace = 0
basic.showIcon(IconNames.Happy)
Mbit_IR.init(Pins.P8)
mbit_Car.RGB_Car_Big(0, 0, 0)
pace = 50
B = 0
G = 0
R = 50
radio.setGroup(111)
resetVars()
basic.forever(function () {
    if (greenseconds > 0) {
        basic.showString("G")
        mbit_Car.CarCtrlSpeed(mbit_Car.CarState.Car_Run, 80)
        mbit_Car.RGB_Car_Big(R, G, B)
        music.playTone(784, music.beat(BeatFraction.Quarter))
    }
    if (lovemode == 1 && greenseconds == 0) {
        mbit_Car.CarCtrl(mbit_Car.CarState.Car_Stop)
        mbit_Car.RGB_Car_Big2(mbit_Car.enColor.OFF)
        lovemode = 0
        basic.showIcon(IconNames.Heart)
    }
    while (avoidmode == 1) {
        AvoidMode()
        basic.pause(20)
    }
    while (trackmode == 1) {
        blacklineTracking()
        basic.pause(20)
    }
    while (trackmode == 2) {
        zebraTracking()
        basic.pause(200)
    }
})
