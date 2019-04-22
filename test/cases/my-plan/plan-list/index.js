import listitem from './list-item'
import list from './list'
import searchfilter from './search-filter'

export default () => {
    /*BEFORE*/
    before(async () => {
        /*CODE*/
    })
    /*/*/

    /*AFTER*/
    after(async () => {
        /*CODE*/
    })
    /*/*/

    describe('list', list)
    describe('list item', listitem)
    describe('search filter', searchfilter)
}
