import roam from './roam'
import effect from './effect'
import header from './header'

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
    describe('roam', roam)
    describe('effect', effect)
    describe('header', header)
}
