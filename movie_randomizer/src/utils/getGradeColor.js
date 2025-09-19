export const getGradeColor = (vote) => {
    if (vote >= 8) {
        return "excellent"
    } else if (vote >= 6.5) {
        return "good"
    } else if (vote >= 4.5) {
        return "average"
    } else if (vote >= 2.5) {
        return "bad"
    } else {
        return "terrible"
    }
}