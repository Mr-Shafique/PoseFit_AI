
import Hero from './Hero';
import Nav from './Nav';
import Exercises from './Exercises'
import History from './History';
import About from './About';

export default function Main() {

    return (
        <>
        <div className='flex'>
            <div className=''>


        <Nav />
        <Hero />
        <Exercises />
        <History />
        <About />
        
        
        {/* <div className='bg-gradient-to-b from-slate-50 to-orange-500'>
            
        

        </div> */}
            </div>
        </div>
        </>
    )

}