import PCMTemplate from 'app/SBE/detail-profile/detail-layout/pcm-template'

const Template = ({ sbeCode, targetCode, positionFromAttribute }) => {
  return (
    <PCMTemplate
      sbeCode={sbeCode}
      targetCode={targetCode}
      positionFromAttribute={positionFromAttribute}
    />
  )
}

export default Template
