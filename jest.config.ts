import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-transformer-svg",
        '\\.(css|less|scss|sass|png|jpg|webp|jpeg|webm)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    extensionsToTreatAsEsm : ['.ts', '.tsx'],
    transform: {
        '^.+\\.(ts|js|tsx)$' : [
            '@swc/jest',
            {
                jsc : {
                    transform : {
                        react : {
                            runtime : 'automatic'
                        }
                    }
                }
            }
        ]
    },
    coverageThreshold : {
        global : {
            branches : 100,
            functions : 100,
            lines : 100,
            statements : 100
        }
    }
}

export default config
