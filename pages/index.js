import React, { Component, createRef, useRef, useState , useEffect} from 'react';

const checkScrollSpeed = (function(settings) {
    settings = settings || {};
  
    let lastPos, newPos, timer, delta,
        delay = settings.delay || 50;
  
    function clear() {
      lastPos = null;
      delta = 0;
    }
  
    clear();
  
    return function() {
      newPos = window.scrollY;
      if (lastPos != null) { // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  function useCrazyScroll(){
      const sectionsRef = useRef()
      const [programmaticScrollTo, setProgrammaticScrollTo] = useState(null)
      const lastScrollTop = useRef(0);
      
      function userScrollHandler(e) {
        console.log("lel", e.isTrusted)
        var st = window.pageYOffset || document.documentElement.scrollTop
        var speed = checkScrollSpeed();
        console.log({speed})
        const jump = Math.abs(window.scrollY -  lastScrollTop.current );

        console.log({jump})
        if(st > lastScrollTop.current){
            speed = Math.abs(speed)
            // downscroll
            if ( st < sectionsRef.current.offsetTop && speed < 100) {
                console.log("SCROLL");
                setProgrammaticScrollTo(sectionsRef.current.offsetTop)                
            } 
        }
        lastScrollTop.current = st <=0  ? 0 : st;
    }
    const userScrollHandlerRef = useRef(userScrollHandler)
    useEffect(() => {
        userScrollHandlerRef.current = userScrollHandler
    })
    function programmaticScrollHandler(e) {
       if(window.scrollY === programmaticScrollTo){
           setProgrammaticScrollTo(null)
       }
    }
      useEffect(() => {
          if(programmaticScrollTo !== null){
            window.addEventListener('scroll', programmaticScrollHandler);
            window.scrollTo({top: programmaticScrollTo, behavior: 'smooth'})
            return () => {
                window.removeEventListener('scroll', programmaticScrollHandler);        
            }              
          }else{
            function handle(e){
                userScrollHandlerRef.current(e)
            }
            window.addEventListener('scroll', handle);
            return () => {
                window.removeEventListener('scroll', handle);        
            }
          }
        
      }, [programmaticScrollTo])

      function goToTop(){
          setProgrammaticScrollTo(0);
      }
      return [sectionsRef, goToTop]
  }

function MyComp(props) {

    const [sectionsRef, goToTop] = useCrazyScroll()

    // constructor() {
    //     super();
    //     this.scrollToSections = this.scrollToSections.bind(this);
    //     this.sectionsRef = createRef()
       
    // }

    // componentDidMount() {
    //     this.lastScrollTop = 0
    //     window.addEventListener('scroll', this.scrollToSections, false);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.scrollToSections, false);
    // }

    // scrollToSections(e) {
    //     console.log("lel", e.isTrusted)
    //     var st = window.pageYOffset || document.documentElement.scrollTop
    //     var speed = checkScrollSpeed();
        
    //     if(st > this.lastScrollTop){
    //         speed = Math.abs(speed)
    //         // downscroll
    //         if ( st < this.sectionsRef.current.offsetTop && speed < 100) {
    //             console.log("SCROLL");
    //             window.scrollTo({top: this.sectionsRef.current.offsetTop, behavior: 'smooth'})
    //         } 
    //     }
    //     this.lastScrollTop = st <=0  ? 0 : st;

    // }

    

        let partitionData = {
          sections: [1, 2, 3, 4]
        };
        let sections = [];

        if (partitionData.sections) {
            partitionData.sections.forEach((section, i) => {
                sections.push(
                    <div className="partition-section">
                        asdf
                        <hr />
                    </div>
                );
            });
        }


        return (
            <div className="partition" >
                <div className="partition-1">
                    <div className={"partition-headline partition-headline-left"}>
                        <h5 data-swiper-parallax="-600">title</h5>
                        description
                    </div>
                    <div className="partition-gradient" />
                </div>
                <div ref={sectionsRef}>
                    <hwr/>
                    <div className="partition-sections">
                        {sections}
                    </div>
                </div>

                <div className="partition-footer">
                    <h2>data 2</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 3</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 4</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 5</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 5</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 5</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
                <div className="partition-footer">
                    <h2>data 5</h2>
                    <div className="partition-footer-back-top">
                        data
                    </div>
                </div>
            </div>
        )
        }


export default MyComp

