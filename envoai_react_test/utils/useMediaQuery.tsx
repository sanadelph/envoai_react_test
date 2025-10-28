import {useState, useEffect} from 'react'

const useMediaQuery = () => {
  const [matchesMediumScreen, setMatchesMediumScreen] = useState(
    window.matchMedia("(max-width: 1380px)")
    .matches
  )
  const [matchesSmallScreen, setMatchesSmallScreen] = useState(
    window.matchMedia("(max-width: 768px)")
    .matches
  )

  useEffect(() => {
    window
    .matchMedia("(max-width: 1380px)")
    .addEventListener('change', e => setMatchesMediumScreen( e.matches ));
  }, []);

  useEffect(() => {
    window
    .matchMedia("(max-width: 768px)")
    .addEventListener('change', e => setMatchesSmallScreen( e.matches ));
  }, []);

  return [matchesMediumScreen, matchesSmallScreen]
}

export default useMediaQuery