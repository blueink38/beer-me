import { formatPhone } from '../utils/helpers'

test('formatPhone', () => {
    let phone = "1234567890"
    expect(formatPhone(phone)).toBe("123-456-7890")
});