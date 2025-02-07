'use client'
import { useState, useEffect } from 'react'
import { t } from '@/utils'
import { frontendSettingsApi } from '@/utils/api'
import { useSelector } from 'react-redux'
import { CurrentLanguageData } from '@/redux/reuducer/languageSlice'
import BreadcrumbComponent from '@/components/Breadcrumb/BreadcrumbComponent'
import Loader from '@/components/Loader/Loader'

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const lang = useSelector(CurrentLanguageData)

    const getAboutUsData = async () => {
        const language_code = lang.code
        try {
            const response = await frontendSettingsApi.getFrontendSetting({
                type: 'about-us',
                language_code,
            })
            const data = response.data.data
            setAboutUs(data)
        } catch (e) {
            console.log(e)
        } finally {
            setisLoading(false)
        }
    }

    useEffect(() => {
        getAboutUsData()
    }, [lang.code])

    return (
        <section className='aboutus'>
            <BreadcrumbComponent title2={t('aboutUs')} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className='container'>
                    <div className='page_content'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: aboutUs.value || '',
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

export default AboutUs
