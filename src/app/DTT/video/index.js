import { useState } from 'react'
import {
  Button,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import VideoRecorder from './video_recorder'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import useApi from 'api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faVideo, faExpand } from '@fortawesome/free-solid-svg-icons'
import Player from './Player'

const Write = ({ questionCode, onSendAnswer, html, data }) => {
  const config = safelyParseJson(html, {})

  const { postMediaFile, getSrc } = useApi()

  const [newData, setNewData] = useState(null)
  const [startVideo, setStartVideo] = useState(false)

  const handleSave = async file => {
    let data = new FormData()

    data.append('file', file)

    const saveData = await postMediaFile({
      data,
    })

    onSendAnswer(saveData.uuid)
  }

  const src = getSrc(data?.value)

  if (src)
    return (
      <VStack>
        <video style={{ width: '20rem', borderRadius: '1rem' }} src={src} controls />
        <Button
          test-id={questionCode + '-clear'}
          onClick={() => {
            setNewData(null)
            setStartVideo(false)
            onSendAnswer()
          }}
        >
          Clear
        </Button>
      </VStack>
    )

  return (
    <VStack>
      {startVideo ? (
        <VideoRecorder
          test-id={questionCode}
          setStartVideo={setStartVideo}
          setData={handleSave}
          config={config}
        />
      ) : (
        <VStack align="start">
          <Text>
            {
              "Record a short introduction about yourself, don't worry we'll give you time to prepare and let you re-record!"
            }
          </Text>
          <HStack>
            <a href={config.explanation_video} target="_blank" rel="noreferrer">
              <Button>{`Instructions`}</Button>
            </a>
            <Button
              test-id={questionCode + '-start'}
              leftIcon={<FontAwesomeIcon icon={faVideo} />}
              onClick={() => setStartVideo(true)}
              colorScheme="primary"
            >{`Ready!`}</Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}

const Read = ({ data, mini, styles }) => {
  const api = useApi()
  const src = api.getSrc(data?.value)

  return mini ? (
    <Popover>
      <PopoverTrigger>
        <IconButton icon={<FontAwesomeIcon icon={faExpand} />} />
      </PopoverTrigger>
      <PopoverContent>
        <Player src={src} />
      </PopoverContent>
    </Popover>
  ) : (
    <Player src={src} styles={styles} />
  )
}

const Video = {
  Write,
  Read,
}

export default Video
