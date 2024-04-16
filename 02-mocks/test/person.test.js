import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person', () => { 
    describe('#validate', () => {
        it('should throw an error if name not found', () => {
            let mockInvalid = {
                name: '',
                cpf: '123-456-789-00'
            }
            expect(() => Person.validate(mockInvalid))
            .toThrow(new Error('name required'))
        })

        it('should throw an error if cpf not found', () => {
            let mockInvalid = {
                name: 'John Doe',
                cpf: ''
            }
            expect(() => Person.validate(mockInvalid))
            .toThrow(new Error('cpf required'))
        })

        it('should not throw if person is valid', () => {
            const mockValid = {
                name: 'John Doe',
                cpf: '123-456-789-00'
            }
            expect(() => Person.validate(mockValid))
            .not.toThrow()
        });
    })

    const mockValidPerson = {
        name: 'Renato',
        cpf: '00099900011',
        lastName: 'Francisco'
    }

    describe('#format', () => {
        it('should format name and cpf', () => {
            const mockPerson = {
                name: 'Renato Francisco',
                cpf: '000.999.000-11'
            }
            const formattedPerson = Person.format(mockPerson)
            expect(formattedPerson).toStrictEqual(mockValidPerson)
        });
    });

    describe('#save', () => {
        it('should throw error if saving invalid person', () => {
            expect(() => Person.save({
                name: 'Renato',
                cpf: '00099900011',
                lastName: ''
            })).toThrow()
        })

        it('should save valid person', () => {
            expect(() => Person.save(mockValidPerson)).not.toThrow()
        })
    });

    describe('#process', () => {
        it('should process a valid person', () => {
            const mockPerson = {
                name: 'John Doe',
                cpf: '123.456.789-00'
            }

            jest.spyOn(
                Person,
                Person.validate.name
            ).mockReturnValue()

            jest.spyOn(
                Person,
                Person.format.name
            ).mockReturnValue({
                cpf: '12345678900',
                name: 'John',
                lastName: 'Doe'
            })

            const result = Person.process(mockPerson)
            expect(result).toStrictEqual('ok')
        })
    });
 })