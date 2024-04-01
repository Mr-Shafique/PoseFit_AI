
import Hero from './Hero';
import Nav from './Nav';
import Exercises from './Exercises'
import History from './History';
import About from './About';

export default function Main() {

    return (
        <>
        <div className='flex justify-center'>
            <div className='container'>


        <Nav />
        <Hero />
        <Exercises />
        <div className='bg-gradient-to-b from-slate-50 to-orange-500'>
            
        <History />
        <About />
        </div>
            </div>
        </div>
        </>
    )

}