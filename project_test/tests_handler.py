import unittest

from project_test.unitTests import test_model


def run_test():
    suite = unittest.TestLoader().loadTestsFromModule(test_model)
    results = unittest.TextTestRunner(verbosity=2).run(suite)
    print(results.wasSuccessful())
    print(results.failures)
    return results.wasSuccessful(),results.failures
