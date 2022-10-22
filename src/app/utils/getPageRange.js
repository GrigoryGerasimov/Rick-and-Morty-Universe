export const getPageRange = pageCount => {
    const pageRangeArr = [];

    const pageRangeIter = {
        from: 1,
        to: pageCount,
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return this.from <= this.to ? { value: this.from++, done: false } : { done: true };
        }
    };

    for (const pageItem of pageRangeIter) pageRangeArr.push(pageItem);

    return pageRangeArr;
};
