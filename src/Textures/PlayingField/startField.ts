// null (not a figure) - пустая клетка
// K (king) - король
// Q (queen) - ферзь
// E (elephant) - слон
// H (horse) - конь
// R (rook) - ладья
// P (pawn) - пешка

// W (white) - белые фигуры
// B (black) - черные фигуры

export const startField =
    [
        [
            ["RW", null, null, "RW", "RW", null, null, "RW"],
            [null, "HW", null, null, null, null, "HW", null],
            [null, "HW", "EW", null, "EW", null, "HW", null],
            ["RW", null, null, "KW", "QW", "EW", null, "RW"],
            ["RW", null, "EW", "QW", "QW", null, null, "RW"],
            [null, "HW", null, "EW", null, "EW", "HW", null],
            [null, "HW", null, null, null, null, "HW", null],
            ["RW", null, null, "RW", "RW", null, null, "RW"],
        ],
        [
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
            ["PW", "PW", "PW", "PW", "PW", "PW", "PW", "PW"],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
        [
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
            ["PB", "PB", "PB", "PB", "PB", "PB", "PB", "PB"],
        ],
        [
            ["RB", null, null, "RB", "RB", null, null, "RB"],
            [null, "HB", null, null, null, null, "HB", null],
            [null, "HB", "EB", null, "EB", null, "HB", null],
            ["RB", null, null, "KB", "QB", "EB", null, "RB"],
            ["RB", null, "EB", "QB", "QB", null, null, "RB"],
            [null, "HB", null, "EB", null, "EB", "HB", null],
            [null, "HB", null, null, null, null, "HB", null],
            ["RB", null, null, "RB", "RB", null, null, "RB"],
        ],
    ]